const express = require('express');

const port = 8000;

const app = express();

app.set('view engine', 'ejs');

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const db = require('./config/db');

const passport = require('passport');
const passportLocal = require('./config/passportlocalStratagy');
const session = require('express-session');

app.use(session({
    secret: 'shreya',
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxage: 1000 * 60 * 60 * 24
    }
}))

app.use(express.urlencoded());

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setUser);

app.use('/', require('./routes/indexRoutes'));

app.listen(port, (error) => {
    if (error) {
        console.log(error);
        return false;
    }
    console.log(`server is start on port :- ${port}`);
})