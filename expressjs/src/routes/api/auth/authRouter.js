const express = require('express');

const router = express.Router();

const authController = require("../../../controllers/auth/authController");
const sendMailController = require("../../../controllers/auth/sendMailController");
const verifySignup = require("../../../middlewares/verifySignup");
const authenticated = require("../../../middlewares/authenticated")

router.post("/signup", verifySignup.checkMail, verifySignup.checkDuplicateUsername, verifySignup.checkRolesExisted, authController.signup);
router.post("/signin", authController.signin);
router.post("/signout", authenticated.authenticateToken, authController.signout);
router.get("/users",authenticated.authenticateToken ,authController.getUserInfo);
router.post("/mails", authenticated.authenticateToken ,sendMailController.sendMailVerify);
router.put("/mails",sendMailController.sendMail);
router.post("/verify",authenticated.authenticateToken ,authController.verifyAccount);
router.post("/users/password" ,authController.resetPassword);
router.put("/users/password",authenticated.authenticateToken ,authController.updatePassword);

module.exports = {
    routes: router
};