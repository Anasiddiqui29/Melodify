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

    // now creating token
    // point to note: We need to create token with atleast one unique atribute so here id is unique
    // const token = jwt.sign({
    //     id: user._id,
    //     role: user.role
    // },process.env.JWT_SECRET)
    
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

    // res.cookie("token" , token);

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

async function logout(req ,res){
    
    res.clearCookie("token");
    
    return res.status(200).json({
        message: "Logged out successfully"
    })
}

module.exports = { registerUser , login , logout , verifyEmail };