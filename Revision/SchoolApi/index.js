const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT;

const db = require('./config/db');
db();

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/',require('./routes/indexRoute'));

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`Server Start On ${PORT}`);
});