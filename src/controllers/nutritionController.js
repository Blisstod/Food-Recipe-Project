const nutritionApi = require('../api/nutritionApi');

const getNutrition = async (req, res) => {
    const query = req.body.query;
    console.log(query)
    try {
        const response = await nutritionApi.get('/', { params: { query } });
        nutritionData = response.data[0]
        res.render('nutrition/nutrition', { req: req, nutritionData });
    } catch (error) {
        res.status(500).render('nutrition/nutrition', { req: req, message: 'Error retrieving nutrition data', nutritionData: null });
    }
};

module.exports = {
    getNutrition
};
