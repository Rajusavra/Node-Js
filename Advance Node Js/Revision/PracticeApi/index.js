const express = require('express');
const app = express();

let dotenv = require('dotenv');
dotenv.config();
const PORT =  process.env.PORT;

const db = require('./config/db');
const { urlencoded } = require('body-parser');
db();

app.use(express.json());
app.use(express.urlencoded());

app.use('/' , require('./routes/indexRoute'));

app.listen(process.env.PORT, (err) => {
    console.log(`Server is running on port ${PORT}`);
    if (err) {
        console.log(err);
        return false;
    }
});