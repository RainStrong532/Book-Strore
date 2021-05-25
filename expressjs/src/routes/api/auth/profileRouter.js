const express = require('express');

const router = express.Router();

const profileController = require("../../../controllers/auth/profileController");
const authenticated = require("../../../middlewares/authenticated")

router.post("/", authenticated.authenticateToken, profileController.saveProfile);
router.put("/", authenticated.authenticateToken, profileController.updateProfile);
router.get("/", authenticated.authenticateToken, profileController.findAll);
router.get("/:account_id", profileController.findUserByAccountId);
router.get("/accounts", authenticated.authenticateToken, profileController.findByAccountId);
router.post("/avatar", authenticated.authenticateToken, profileController.updateAvatar);
router.post("/coverimage", authenticated.authenticateToken, profileController.updateCoverImage);
router.delete("/avatar", authenticated.authenticateToken, profileController.deleteAvatar);
router.delete("/coverimage", authenticated.authenticateToken, profileController.deleteCoverImage);
router.get("/:profile_id", authenticated.authenticateToken, profileController.findById);

module.exports = {
    routes: router
};