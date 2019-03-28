var conDb = require("./conexion_db.js");

function obtenerCompetencias(req, res) {
  var sqlQuery = "select id, nombre from competencias";
  conDb.query(sqlQuery, function(error, resp) {
    res.send(resp);
  });
}

module.exports = {
  obtenerCompetencias: obtenerCompetencias
};
