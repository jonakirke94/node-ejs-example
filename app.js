const express = require('express');
const app = express();
const bodyParser = require('body-parser');



const clientRoutes = require('./routes/client')

app.use("/assets", express.static(__dirname + "/assets"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
  });

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/clients', clientRoutes);


app.use((req, res, next) => {
    const error = new Error("Not Found");
    console.error('ERROR');
    error.status = 404;
    next(error);
});

module.exports = app;