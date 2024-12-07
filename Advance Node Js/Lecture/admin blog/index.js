const express = require("express");

let port = 8000;

let app = express();

const path = require('path');


const db = require('./config/mongoose');

app.set("view engine", "ejs");

const cookieParser = require('cookie-parser');

app.use(express.urlencoded());

app.use(cookieParser());

app.use('/',require('./routes/indexRoute'));

app.set('views',path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname,'assets')));

app.use('/uploads',express.static(path.join(__dirname,'uploads')))

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(` Server Running on : ${port} `);

});