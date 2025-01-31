const express = require('express');
const app = express();

const dotenv = require('dotenv')
dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`Server Start On ${PORT}`);
})
