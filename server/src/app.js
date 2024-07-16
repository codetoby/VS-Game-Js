const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session')
const { getPool } = require('./repositories/database/createPool')
const passport = require('passport')
const MariaDBStore = require('express-session-mariadb-store');
const errorMiddleware = require('./api/middlewares/errorHandler');
const { SESSION_SECRET } = require('./config');

const app = express();

require("./utils/strategies/discord");

app.use(cors(
    {
        origin: 'http://localhost:3000',
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true
    }
));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "*")
    next()
})

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 365 * 1000 },
    store: new MariaDBStore({
        pool: getPool()
    })
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", require('./api/routes'));

app.use(errorMiddleware);

module.exports = app;
