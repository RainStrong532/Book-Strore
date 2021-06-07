const express = require('express');

const router = express.Router();

const imageController = require("../../../controllers/app/imageController");

const ModelMulter = require("../../../data/image/ModelMulter");

router.post("/upload", ModelMulter.single("image"), imageController.upload);
router.get("/id/:image_id", imageController.findById);
router.get("/:name", imageController.findByImageName);

module.exports = {
    routes: router
};