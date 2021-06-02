const express = require('express');

const router = express.Router();
const imageRouter = require("../app/uploadRouter");
const chatRouter = require("../app/chatRouter");
const bookRouter = require("../app/bookRouter");
const authorRouter = require("../app/authorRouter");
const categoryRouter = require("../app/categoryRouter");

router.use("/images", imageRouter.routes);
router.use("/conversations", chatRouter.routes);
router.use("/books", bookRouter.routes);
router.use("/authors", authorRouter.routes);
router.use("/categories", categoryRouter.routes);

module.exports = {
    routes: router
};