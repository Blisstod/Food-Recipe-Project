const express = require('express')
const pageController = require('../controllers/pageController');
const authController = require('../controllers/authController')
const userAuth = require("../middleware/userAuth");

router = express.Router();

router.get('/', pageController.mainPage);
router.get('/register', pageController.registerPage)
router.get('/login', pageController.loginPage)

router.post('/register', authController.registerUser)
router.post('/login', authController.loginUser)
router.post('/logout', authController.logoutUser);

module.exports = router;