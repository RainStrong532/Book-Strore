const express = require('express');

const router = express.Router();

const authController = require("../../../controllers/auth/authController");
const sendMailController = require("../../../controllers/auth/sendMailController");
const verifyData = require("../../../middlewares/verifyData");
const authenticated = require("../../../middlewares/authenticated")

router.post("/signup", verifyData.checkMail, verifyData.checkDuplicateUsername, verifyData.checkRolesExisted, authController.signup);
router.post("/signin", authController.signin);
router.post("/signout", authenticated.authenticateToken, authController.signout);
router.get("/users",authenticated.authenticateToken ,authController.getUserInfo);
router.post("/mails", sendMailController.sendMailVerify);
router.put("/mails",sendMailController.sendMail);
router.post("/email",authController.existedEmail);
router.post("/verify" ,authController.verifyAccount);
router.post("/users/password" ,authController.resetPassword);
router.put("/users/password",authenticated.authenticateToken ,authController.updatePassword);
router.post("/:user_name",authController.existedUserName);

module.exports = {
    routes: router
};