const express = require('express');

const router = express.Router();

const imageController = require("../../../controllers/app/imageController");

const uploadMiddleware = require("../../../middlewares/uploadImage");

router.post("/upload", uploadMiddleware, imageController.upload);
router.get("/id/:image_id", imageController.findById);
router.get("/:name", imageController.findByImageName);

module.exports = {
    routes: router
};