const express = require("express");

let code = 8000;

let app = express();

app.set("view engine", "ejs");

let path = require("path");

app.use("/",express.static(path.join(__dirname,"/public")));

app.use('/',require('./routes/indexRoute'));

app.get("/login", (req, res) => {
    return res.render("login");
});
app.get("/register", (req, res) => {
    return res.render("register");
});
app.get("/error403", (req, res) => {
    return res.render("error403");
});
app.get("/error404", (req, res) => {
    return res.render("error404");
});
app.get("/error405", (req, res) => {
    return res.render("error405");
});
app.get("/error500", (req, res) => {
    return res.render("error500 ");
});

app.listen(code, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(` Server Running on : ${code} `);

});