const express = require('express');

let port = 8001;

let app = express();

const db = require('./config/db');

const path = require('path');

const cors = require('cors')

app.use(cors());

app.use(express.json());

app.use(express.urlencoded());

app.use('/',require('./routes/indexRoute'));

app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(` Server Running on : ${port} `);

});