const spoonacularApi = require('../api/spoonacularApi');

class RecipeController {
    async showRecipesPage(req, res) {
        try {
            const recipes = await spoonacularApi.searchRecipes(req.query.food || ''); // Default to empty string if no query
            console.log(recipes)
            res.render('recipes/recipes', { recipes });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async showRecipeDetails(req, res) {
        try {
            const recipeDetails = await spoonacularApi.getRecipeDetails(req.params.id);
            res.render('recipes/recipe-details', { recipeDetails });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}

module.exports = new RecipeController();
