const express = require("express");
const {signUp,Login,forgotPassword,verifyPassResetCode,resetPassword}= require("../services/authService")
const {signUpValidator,loginValidator}= require('../utils/validatrors/authValidators');
const authService = require("../services/authService");
const router = express.Router();

router.route("/SignUp").post(signUpValidator,signUp);
router.route("/Login").get(loginValidator,Login);
router.route("/forgotpassword").post(forgotPassword);
router.route("/verifyResetCode").post(verifyPassResetCode)
router.route("/resetPassword").put(resetPassword)

module.exports = router;