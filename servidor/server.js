var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var dotenv = require("dotenv").config();
console.log(dotenv);
var controlador = require("./controller.js");

var app = express();
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.get("/competencias", controlador.obtenerCompetencias);

var puerto = "8080";

app.listen(puerto, function() {
  console.log("Escuchando en el puerto " + puerto);
});
