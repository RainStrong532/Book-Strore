const express = require('express');

const router = express.Router();
const imageRouter = require("../app/uploadRouter");

router.use("/images", imageRouter.routes);

module.exports = {
    routes: router
};