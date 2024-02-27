const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
    names: {
        en: { type: String, required: true },
        ru: { type: String, required: true }
    },
    descriptions: {
        en: { type: String, required: true },
        ru: { type: String, required: true }
    },
    images: [{ type: String }],
    stars: { type: Number, min: 1, max: 5, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date }
});

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;
