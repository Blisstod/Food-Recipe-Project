const express = require('express');
const recipeController = require('../controllers/recipeController');
const userAuth = require('../middleware/userAuth');

const router = express.Router();

router.use(userAuth);

router.get('/', recipeController.showRecipesPage);
router.get('/:id', recipeController.showRecipeDetails);

module.exports = router;
