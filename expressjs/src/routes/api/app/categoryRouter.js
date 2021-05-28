const express = require('express');

const router = express.Router();

const categaryController = require("../../../controllers/app/categaryController");
const authenticated = require("../../../middlewares/authenticated");

router.get('/', categaryController.findAll);
router.get('/parent/:id', categaryController.findByParent);
router.put('/parent', authenticated.authenticateToken, authenticated.isAdmin, categaryController.updateParent);
router.delete('/parent', authenticated.authenticateToken, authenticated.isAdmin, categaryController.deleteParent);
router.get('/:id', categaryController.findById);
router.post('/', authenticated.authenticateToken, authenticated.isAdmin, categaryController.save);
router.put('/:id', authenticated.authenticateToken, authenticated.isAdmin, categaryController.update);
router.delete('/:id', authenticated.authenticateToken, authenticated.isAdmin, categaryController.deleteCategory);

module.exports = {
    routes: router
};