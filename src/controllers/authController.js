const authService = require('../services/authServices')
const e = require("express");

class AuthController {
    async registerUser( req, res ){
        try {
            const { user, token } = await authService.register(req.body);
            res.redirect('/login')
        }catch (error) {
            console.error(error);
            res.status(400).render('auth/register', { req: req, message: error.message })
        }
    }

    async loginUser(req, res) {
        try {
            const { user, token } = await authService.login(req.body);
            res.cookie("token", token, { httpOnly: true });
            res.redirect('/')
        } catch (error) {
            console.error(error);
            res.status(400).render('auth/login', { req: req, message: error.message });
        }
    }

    async logoutUser(req, res) {
        try {
            res.cookie("token", "", {httpOnly: true, expires: new Date(0)});
            res.redirect('/login');
        } catch(error){
            console.error(error)
            res.status(400).render('main', { req: req, message: error.message })
        }
    }


}

module.exports = new AuthController();