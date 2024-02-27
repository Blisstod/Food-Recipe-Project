const express = require('express')
const adminController = require('../controllers/adminController')
const pageController = require('../controllers/pageController')
const adminAuth = require('../middleware/adminAuth')

router = express.Router();

router.use(adminAuth);

router.get('/users/add', pageController.addUserPage)
router.get('/users/:id/edit', pageController.editUserPage)

router.get('/', adminController.getAllUsers);
router.post('/users/add', adminController.addUser);
router.get('/users/:id', adminController.getUserDetails);
router.put('/users/:id/edit', adminController.editUser)
router.delete('/users/:id', adminController.deleteUser);

module.exports = router;