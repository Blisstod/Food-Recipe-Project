const express = require('express')
const dishController = require('../controllers/dishController')
const pageController = require('../controllers/pageController')
const adminAuth = require('../middleware/adminAuth')
const userAuth = require('../middleware/userAuth')
const methodOverride = require('method-override');

router = express.Router();
router.use(methodOverride('_method'));

router.get('/admin/:id/edit', adminAuth, dishController.getEditDish)
router.get('/admin/add', adminAuth, pageController.getAddDishPage);

router.get('/', userAuth, dishController.getAllDishes);
router.get('/admin', adminAuth, dishController.getAdminDishes);

router.post('/admin/add', adminAuth, dishController.addDish);
router.put('/admin/:id', adminAuth, dishController.editDish);
router.delete('/admin/:id', adminAuth, dishController.deleteDish);

module.exports = router;