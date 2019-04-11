var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var dotenv = require("dotenv").config();
console.log(dotenv);
var controller = require("./controller.js");

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

app.get("/generos", controller.obtenerGeneros);
app.get("/directores", controller.obtenerDirectores);
app.get("/actores", controller.obtenerActores);
app.get("/competencias/:id", function(req, res) {
  var id = req.params.id;
  controller.obtenerCompetencia(id, res);
});
app.post("/competencias", function(req, res) {
  controller.crearCompetencia(req.body, res);
});
app.delete("/competencias/:id", function(req, res) {
  var id = req.params.id;
  controller.eliminarCompetencia(id, res);
});
app.delete("/competencias/:id/votos", function(req, res) {
  var id = req.params.id;
  controller.eliminarVotos(id, res);
});
app.put("/competencias/:id", function(req, res) {
  controller.editarCompetencia(req, res);
});

var puerto = "8000";

app.listen(puerto, function() {
  console.log("Escuchando en el puerto " + puerto);
});
