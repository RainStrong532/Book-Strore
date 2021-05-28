const express = require('express');

const router = express.Router();

const chatController = require("../../../controllers/app/chatController");

const authenticated = require("../../../middlewares/authenticated");

router.post("/users/conversations", authenticated.authenticateToken, chatController.saveConversation);
router.post("/users/messages", authenticated.authenticateToken, chatController.saveMessage);
router.get("/users/conversations", authenticated.authenticateToken, chatController.findAll);

module.exports = {
    routes: router
};