const express = require('express');
const app = express();

const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded(({extended : true})));

const userRoute = require('./routes/userRoutes');
app.use('/',userRoute);

app.listen(PORT, (err) => {
    console.log(`Server Runing On http://localhost:${PORT}`);
    if (err) {
        console.log(err);
        return false;
    }
});