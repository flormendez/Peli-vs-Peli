var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var controller = require("./controller.js");
var dotenv = require("dotenv").config();
console.log(dotenv);

var app = express();
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.get("/competencias", controller.obtenerCompetencias);
app.get("/competencias/:id/peliculas", function(req, res) {
  var id = req.params.id;
  controller.obtenerOpciones(id, res);
});
app.post("/competencias/:id/voto", function(req, res) {
  controller.votar(req, res);
});
app.get("/competencias/:id/resultados", function(req, res) {
  var id = req.params.id;
  controller.obtenerResultados(id, res);
});

var puerto = "8080";

app.listen(puerto, function() {
  console.log("Escuchando en el puerto " + puerto);
});
