const express = require('express');

const router = express.Router();

const chatController = require("../../../controllers/app/chatController");

const authenticated = require("../../../middlewares/authenticated");

router.post("/", authenticated.authenticateToken, chatController.saveConversation);
router.post("/messages", authenticated.authenticateToken, chatController.saveMessage);
router.get("/:conversation_id", authenticated.authenticateToken, chatController.getConversationById)
router.get("/:conversation_id/messages", authenticated.authenticateToken, chatController.findMesssages);

module.exports = {
    routes: router
};