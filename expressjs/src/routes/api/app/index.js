const express = require('express');

const router = express.Router();
const imageRouter = require("../app/uploadRouter");
const chatRouter = require("../app/chatRouter");

router.use("/images", imageRouter.routes);
router.use("/chats", chatRouter.routes);

module.exports = {
    routes: router
};