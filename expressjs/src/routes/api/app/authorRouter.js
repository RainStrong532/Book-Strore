const express = require('express');

const router = express.Router();

const authorController = require("../../../controllers/app/authorController");
const authenticated = require("../../../middlewares/authenticated");

router.get("/", authorController.findAll);
router.post("/", authenticated.authenticateToken, authenticated.isAdmin, authorController.save);
router.get("/:id", authorController.findById);
router.delete("/:id", authenticated.authenticateToken, authenticated.isAdmin, authorController.deleteAuthor);
router.put("/:author_id", authenticated.authenticateToken, authenticated.isAdmin, authorController.update);
router.get("/:author_id/images", authorController.findAllImage);
router.post("/:author_id/images", authenticated.authenticateToken, authenticated.isAdmin, authorController.saveImage);
router.get("/:author_id/images/:image_id", authorController.findImage);
router.delete("/:author_id/images/:image_id", authenticated.authenticateToken, authenticated.isAdmin, authorController.deleteImage);

module.exports = {
    routes: router
};