require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const connectDB= require('./src/config/db')
const router = require('./src/routes');
const methodOverride = require('method-override');
const {locals} = require("express/lib/application");
const jwt = require('jsonwebtoken')
const i18next = require('i18next');
const middleware = require('i18next-http-middleware');
const Backend = require('i18next-node-fs-backend');
const session = require('express-session');

const app = express()
const port = process.env.PORT

app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(function (req, res, next) {
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            res.locals.login = true;
            res.locals.username = decoded.username;
        } catch (error) {
            res.locals.login = false;
            res.locals.username = null;
        }
    } else {
        res.locals.login = false;
        res.locals.username = null;
    }
    next();
});

i18next
    .use(Backend)
    .use(middleware.LanguageDetector)
    .init({
        fallbackLng: 'en',
        preload: ['en', 'ru'],
        backend: {
            loadPath: __dirname + '/src/locales/{{lng}}.json',
        },
        detection: {
            order: ['session', 'querystring', 'cookie'],
            caches: ['cookie'],
            lookupSession: 'lang',
            lookupQuerystring: 'lang',
            lookupCookie: 'i18next',
            cookieMinutes: 10,
            cookieDomain: 'myDomain'
        },
    });

app.use(session({
    secret: process.env.SESSION_SECRET || 'yourSuperSecret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
}));
app.use(middleware.handle(i18next));
app.use((req, res, next) => {
    let lang = req.session.lang || 'en';
    console.log(lang)
    req.i18n.changeLanguage(lang);
    next();
});


app.use('/', router);


app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');
connectDB();


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
