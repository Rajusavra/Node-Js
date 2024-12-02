const express = require("express");

let port = 8000;

let app = express();

const db = require('./config/db');

app.set("view engine", "ejs");

const passport = require('passport');
const passportlocal = require('./config/passportlocal');
const session = require('express-session');

app.use(session({
    secret: 'sparky',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setUser);

const path = require('path');

app.use(express.urlencoded());

app.use('/',require('./routes/indexRoute'));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use('/uploads',express.static(path.join(__dirname,'uploads')))

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(` Server Running on : ${port} `);

});