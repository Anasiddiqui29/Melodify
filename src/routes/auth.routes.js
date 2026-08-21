const express = require("express");
const authController = require("../controllers/auth.controller")

// require router
const router = express.Router();

// api for register
router.post("/register" , authController.registerUser)

router.post("/login" , authController.login)

router.post("/logout" , authController.logout)

module.exports = router;