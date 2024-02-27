const express = require('express');
const nutritionController = require('../controllers/nutritionController');
const pageController = require('../controllers/pageController')
const userAuth = require('../middleware/userAuth');

const router = express.Router();

router.use(userAuth);

router.get('/', pageController.nutritionAnalysisPage);
router.post('/', nutritionController.getNutrition);

module.exports = router;
