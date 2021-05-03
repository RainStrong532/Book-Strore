const express = require('express');

const router = express.Router();

const imageController = require("../../../controllers/imageController");

const uploadMiddleware = require("../../../middlewares/uploadImage");

router.post("/upload", uploadMiddleware, imageController.upload);
router.get("/:name", imageController.findByImageName);

module.exports = {
    routes: router
};