var conDb = require("./conexion_db.js");

function obtenerCompetencias(req, res) {
  var sqlQuery = "select id, nombre from competencias";
  conDb.query(sqlQuery, function(error, resp) {
    res.send(resp);
  });
}

function competenciaQuery(data) {
  var sql =
    "SELECT pelicula.id, pelicula.titulo, pelicula.poster FROM pelicula JOIN actor_pelicula ON pelicula.id = actor_pelicula.pelicula_id JOIN actor on actor_pelicula.actor_id = actor.id JOIN director_pelicula dp ON dp.pelicula_id = pelicula.id";
  var paramsCount = false;
  if (data.genero_id) {
    sql = sql.concat(" WHERE genero_id =" + data.genero_id);
    paramsCount = true;
  }
  if (data.actor_id) {
    if (paramsCount) {
      sql = sql.concat(" AND");
    } else {
      sql = sql.concat(" WHERE");
    }
    sql = sql.concat(" actor_id =" + data.actor_id);
    paramsCount = true;
  }
  if (data.director) {
    if (paramsCount) {
      sql = sql.concat(" AND");
    } else {
      sql = sql.concat(" WHERE");
    }
    sql = sql.concat(" dp.director_ID =" + data.director);
    paramsCount = true;
  }
  sql = sql.concat(" ORDER BY rand() LIMIT 2;");
  return sql;
}

module.exports = {
  obtenerCompetencias: obtenerCompetencias,
  competenciaQuery: competenciaQuery
};
