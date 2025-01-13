const express = require('express');

const port = 8000;

const app = express();

app.set("view engine", "ejs");

const path = require('path');

const db = require('./config/db');
db();

const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/pasport');

app.use(session({
    secret: "Sparky",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));


app.use(passport.session());
app.use(passportLocal.initialize());

app.use(express.urlencoded());
app.use('/', require('./routes/indexRoute'));

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Server Runing on : ${port}`);
})