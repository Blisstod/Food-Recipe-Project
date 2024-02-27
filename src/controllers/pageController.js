const { User, DeletedUser } = require('../models/userModel');
const adminService = require('../services/adminService')
class PageController {
    loginPage(req, res, next) {
        try {
            res.render('auth/login', { req: req });
        }catch (error){
            next(error);
        }
    }

    registerPage(req, res, next) {
        try {
            res.render('auth/register', { req: req });
        } catch (error) {
            next(error);
        }

    }

    mainPage(req, res, next) {
        try {
            res.render('main', {errorMessage: req.query.error});
        }catch (error) {
            next(error);
        }
    }

    async editUserPage(req, res, next) {
        try {
            const userId = req.params.id;
            const user = await adminService.getUserDetails(userId);
            if (!user) {
                res.status(404).send('User not found');
            } else {
                res.render('admin/edit-user', { user });
            }
        } catch (error) {
            next(error);
        }
    }

    async addUserPage(req, res, next) {
        try{
            res.render('admin/add-user', {errorMessage: req.query.error});
        } catch(error) {
            next(error);
        }
    }
    async nutritionAnalysisPage(req, res) {
        res.render('nutrition/nutrition', {req: req , nutritionData: null });
    }

    async getEditDishPage(req, res, next){
        try{
            res.render('dish/edit-dish', {errorMessage: req.query.error} )
        }catch(error) {
            next(error);
        }
    }

    async getAddDishPage(req, res, next){
        try{
            res.render('dish/add-dish', {errorMessage: req.query.error} )
        }catch(error) {
            next(error);
        }
    }
}

module.exports = new PageController();
