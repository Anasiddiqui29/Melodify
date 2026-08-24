const express = require("express");
const authController = require("../controllers/auth.controller")

// require router
const router = express.Router();

// api for register
router.post("/register" , authController.registerUser)

router.get("/verify-email/:token" , authController.verifyEmail)

router.post("/forgot-password" , authController.forgotPassword)

router.post("/reset-password/:token" , authController.resetPassword)

router.post("/login" , authController.login)

router.post("/logout" , authController.logout)

module.exports = router;