const axios = require('axios');

const spoonacularBaseUrl = 'https://api.spoonacular.com/recipes';
const apiKey = process.env.SPOONACULAR_API_KEY;

const searchRecipes = async (query) => {
    try {
        const response = await axios.get(`${spoonacularBaseUrl}/complexSearch`, {
            params: {
                query: query,
                apiKey: apiKey
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error searching recipes:', error.message);
        throw error;
    }
};

const getRecipeDetails = async (id) => {
    try {
        const response = await axios.get(`${spoonacularBaseUrl}/${id}/information`, {
            params: {
                apiKey: apiKey
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting recipe details:', error.message);
        throw error;
    }
};

module.exports = {
    searchRecipes,
    getRecipeDetails
};
