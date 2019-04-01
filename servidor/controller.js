var conDb = require("./conexion_db.js");

function obtenerCompetencias(req, res) {
  var sql = "select id, nombre from competencias";
  conDb.query(sql, function(error, resp) {
    res.send(resp);
  });
}

function armarConsulta(data) {
  var sql =
    "SELECT pelicula.id, pelicula.titulo, pelicula.poster FROM pelicula JOIN actor_pelicula ON pelicula.id = actor_pelicula.pelicula_id JOIN actor on actor_pelicula.actor_id = actor.id JOIN director_pelicula ON director_pelicula.pelicula_id = pelicula.id";
  var parametros = false;
  if (data.genero_id) {
    sql = sql.concat(" WHERE genero_id =" + data.genero_id);
    parametros = true;
  }
  if (data.actor_id) {
    if (parametros) {
      sql = sql.concat(" AND");
    } else {
      sql = sql.concat(" WHERE");
    }
    sql = sql.concat(" actor_id =" + data.actor_id);
    parametros = true;
  }
  if (data.director) {
    if (parametros) {
      sql = sql.concat(" AND");
    } else {
      sql = sql.concat(" WHERE");
    }
    sql = sql.concat(" director_pelicula.director_ID =" + data.director);
    parametros = true;
  }
  sql = sql.concat(" ORDER BY rand() LIMIT 2;");
  return sql;
}

function obtenerOpciones(id, res) {
  var sql = "select * from competencias where id =" + id + ";";
  conDb.query(sql, function(error, resCompetencia) {
    if (resCompetencia.length > 0) {
      var sqlOpciones = armarConsulta(resCompetencia[0]);
      conDb.query(sqlOpciones, function(error, resPeli) {
        var opciones = {
          competencia: resCompetencia[0].nombre,
          peliculas: resPeli
        };
        res.send(opciones);
      });
    } else {
      return res.status(404).json("No se encontro la competencia");
    }
  });
}

module.exports = {
  obtenerCompetencias: obtenerCompetencias,
  obtenerOpciones: obtenerOpciones
};
