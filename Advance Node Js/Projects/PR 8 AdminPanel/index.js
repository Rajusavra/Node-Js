const express = require("express");

let port = 8000;

let app = express();

const session = require('express-session');
const passport = require('passport');
const passportlocal = require('./config/passportlocal');

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


const db = require('./config/mongoose');

app.set("view engine", "ejs");

app.use(express.urlencoded());

app.use('/',require('./routes/indexRoute'));

app.set('views',path.join(__dirname,'views'));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use('/uploads',express.static(path.join(__dirname,'uploads')))

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(` Server Running on : ${port} `);

});