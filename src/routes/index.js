const express = require('express');
const authRoutes = require('./authRoutes');
const adminRoutes = require('./adminRoutes');
const recipeRoutes = require('./recipeRoutes');
const nutritionRoutes = require('./nutritionRoutes')
const dishRoutes = require('./dishRoutes')

const router = express.Router();

router.use('/', authRoutes);
router.use('/recipes', recipeRoutes);
router.use('/nutrition', nutritionRoutes)
router.use('/admin', adminRoutes);
router.use('/dishes', dishRoutes)

router.get('/change-lang/:lang', (req, res) => {
    const selectedLang = req.params.lang;
    console.log("Changing language to:", selectedLang); // Added logging
    req.session.lang = selectedLang;
    req.i18n.changeLanguage(selectedLang, (err) => {
        if (err) {
            console.error('Error changing language:', err);
            return res.status(500).send('Error changing language');
        }

        req.session.save(() => {
            const referrer = req.get('Referrer') || '/'
            res.redirect(referrer);
        });
    });
});


module.exports = router;
