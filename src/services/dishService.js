const Dish = require('../models/dishModel')

class DishService {
    async createDish(dishData) {
        const dish = new Dish(dishData);
        await dish.save()
        return dish;
    }

    async updateDish(dishId, updateData) {
        updateData.updatedAt = new Date();
        const dish = await Dish.findByIdAndUpdate(dishId, updateData);
        return dish;
    }

    async deleteDish(dishId){
        await Dish.findByIdAndDelete(dishId, {deletedAt: new Date()})
    }

    async getDishById(id){
        return Dish.findById(id)
    }
}

module.exports = new DishService()