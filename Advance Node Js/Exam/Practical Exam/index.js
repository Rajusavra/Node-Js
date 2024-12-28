const express = require("express");

let port = 8000;

let app = express();

const db = require('./config/db');

const path = require('path');

app.set("view engine", "ejs");

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(` Server Running on : ${port} `);
});