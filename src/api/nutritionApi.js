const axios = require('axios');
require('dotenv').config();

const nutritionApi = axios.create({
    baseURL: 'https://api.api-ninjas.com/v1/nutrition',
    headers: {
        'X-Api-Key': process.env.NUTRITION_API_KEY
    }
});

module.exports = nutritionApi;
