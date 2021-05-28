const express = require('express');

const router = express.Router();

const bookController = require("../../../controllers/app/bookController");
const validateBook = require("../../../middlewares/validateBook");
const authenticated = require("../../../middlewares/authenticated");

router.get("/", bookController.findAll);
router.post("/", authenticated.authenticateToken, authenticated.isAdmin,validateBook.validate, bookController.saveBook);
router.get('/authors/:author_id', bookController.findByAuthorId);
router.get('/categories/:category_id', bookController.findByCategoryId);
router.get("/:id", bookController.findById);
router.delete("/:id", authenticated.authenticateToken, authenticated.isAdmin, bookController.deleteBook);
router.put("/:id", authenticated.authenticateToken, authenticated.isAdmin, bookController.update);
router.get("/:book_id/images", bookController.findAllImage);
router.post("/:book_id/images", authenticated.authenticateToken, authenticated.isAdmin, bookController.saveImage);
router.get("/:book_id/images/:image_id", bookController.findImage);
router.delete("/:book_id/images/:image_id", authenticated.authenticateToken, authenticated.isAdmin, bookController.deleteImage);

module.exports = {
    routes: router
};