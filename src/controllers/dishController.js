const dishService = require('../services/dishService');
const Dish = require('../models/dishModel')

class DishController {
    async addDish(req, res) {
        try {
            const dish = await dishService.createDish(req.body);
            console.log(dish)
            res.redirect('/dishes/admin');
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async editDish(req, res){
        try {
            const dish = await dishService.updateDish(req.params.id, req.body);
            console.log(dish)
            res.redirect('/dishes/admin');
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async deleteDish(req, res) {
        try {
            await dishService.deleteDish(req.params.id);
            res.redirect('/dishes/admin');
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async getAllDishes(req, res) {
        try {
            const dishes = await Dish.find({});
            res.render('dish/dish', { dishes: dishes });
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async getAdminDishes(req, res) {
        try {
            const dishes = await Dish.find({});
            res.render('dish/admin-dish', { dishes: dishes });
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async getEditDish(req, res) {
        try {
            const dish = await dishService.getDishById(req.params.id)
            res.render('dish/edit-dish', { dish });
        } catch (error){

            res.status(500).send(error);
        }
    }
}

module.exports = new DishController()