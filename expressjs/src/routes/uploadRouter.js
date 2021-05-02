const express = require('express');

const router = express.Router();
const imageRouter = require("../controllers/imageController");
const uploadMiddleware = require("../middlewares/uploadImage");

router.post("/upload", uploadMiddleware, imageRouter.upload);
router.get("/:name", imageRouter.findByImageName);

module.exports = {
    routes: router
};