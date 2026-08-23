const mongoose = require("mongoose");

// lets create user schema
const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    role:{
        type: String,
        enum: ['user' , 'artist'],
        default: 'user',
    },

    emailVerified: {
        type: Boolean,
        default: false
    },

    emailVerificationToken: {
        type: String
    },

    emailVerificationExpires: {
        type: Date
    },

    passwordResetToken: {
        type: String
    },

    passwordResetExpires: {
        type: Date
    }

})

const userModel = mongoose.model("user" , userSchema);

module.exports = userModel;