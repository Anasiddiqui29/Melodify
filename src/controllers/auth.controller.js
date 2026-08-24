const userModel = require('../models/user.model');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const {sendEmail} = require("../services/email.service")

async function registerUser(req , res){

    const {username , email , password , role='user'} = req.body;

    const isUserAlreadyExist = await userModel.findOne({
        $or: [
            {username},
            {email}
        ]
    });

    if(isUserAlreadyExist)
    {
        return res.status(401).json({
            message: "User already exist"
        });
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await userModel.create({
        username ,
        email,
        password: hashedPassword,
        role
    })
    
    // We will be generating email verification token
    const verificationToken = crypto.randomBytes(32).toString("hex")

    user.emailVerificationToken = verificationToken;
    user.emailVerificationExpires = Date.now() + 30 * 60 * 1000;

    await user.save();

    // verification link
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;

    // Sending verification email
    await sendEmail(
        user.email,
        "Verify your Spotify Clone account",
        `
            <h2>Welcome to Spotify Clone 🎵</h2>

            <p>Please verify your email address to activate your account.</p>

            <a href="${verificationLink}">
                Verify Email
            </a>

            <p>This link will expire in 30 minutes.</p>
        `
    );

    res.status(201).json({
        message:"User created successfully. Please verify your email.",
        user: {
            id: user._id,
            username : user.username,
            email: user.email,
            role: user.role
        }
    });

    //Reversibility: Encryption can be reversed back to original text using a key, 
    // but hashing is permanent and cannot be turned back into the original input.

}

async function login(req , res){

    const {username , email , password} = req.body;

    const user = await userModel.findOne({
        $or: [
            {username},
            {email}
        ]
    })

    if(!user)
    {
        return res.status(401).json({
            message: "Invalid Credentials"
        });
    }

    const isPasswordValid = await bcrypt.compare(password , user.password)

    if(!isPasswordValid)
    {
        return res.status(401).json({
            message: "Invalid Credentials"
        })
    }

    const token = jwt.sign({
        id: user._id,
        role: user.role
    },process.env.JWT_SECRET)

    res.cookie("token" , token);

    res.status(201).json({
        message:"Logged in successfully",
        user: {
            id: user._id,
            username : user.username,
            email: user.email,
            role: user.role
        }
    })

}

async function verifyEmail(req,res){
    // first verify the token and if verified then set verifyEmail to true

    const {token} = req.params;

    const user = await userModel.findOne({
        emailVerificationToken: token,
        emailVerificationExpires: {
            $gt : Date.now()
        }
    });

    if(!user){
        return res.status(400).json({
            message: "Invalid or expired Validation token"
        })
    }

    user.emailVerified = true;
    user.emailVerificationExpires = undefined 
    user.emailVerificationToken = undefined

    await user.save()

    return res.status(200).json({
        message: "Email verified successfully"
    });

}

async function forgotPassword(req,res) {

    const {email} = req.body

    const user = await userModel.findOne({email});

    if(!user)
    {
        return res.status(401).json({
            message: "User not found"
        })
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.passwordResetToken = resetToken;

    user.passwordResetExpires = new Date(Date.now() + 15*60*1000) ;
    
    await user.save()

    const resetLink = 
        `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await sendEmail(
        user.email ,

        "Reset your Spotify Clone password",
        `
            <h2>Password Reset</h2>

            <p>You requested to reset your password.</p>

            <p>Click the button below to reset it:</p>

            <a href="${resetLink}">
                Reset Password
            </a>

            <p>This link will expire in 15 minutes.</p>

            <p>
                If you did not request this, you can safely ignore this email.
            </p>
        `
    )

    return res.status(200).json({
        message : "Please check your email box"
    });

}

async function resetPassword(req,res){

    const {token} = req.params; 
    const {password} = req.body;

    if(!password){
        return res.status(400).json({
            message: "Password is required"
        });
    }

    const user = await userModel.findOne({
        passwordResetToken : token ,
        passwordResetExpires : {
            $gt : Date.now()
        } 
    });

    if(!user){
        return res.status(400).json({
            message: "Invalid or expired password reset token"
        });
    }

    const hashedPassword = await bcrypt.hash(password , 10);

    user.password = hashedPassword;

    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    return res.status(200).json({
        message: "Password reset successfully"
    });

}

async function logout(req ,res){
    
    res.clearCookie("token");
    
    return res.status(200).json({
        message: "Logged out successfully"
    })
}

module.exports = { registerUser , login , logout , verifyEmail , forgotPassword , resetPassword};