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


function votar(req, res) {
  var competenciaId = req.params.id;
  var peliculaId = req.body.idPelicula;
  var sqlPeli = "SELECT * FROM pelicula where id =" + peliculaId + ";";
  conDb.query(sqlPeli, function(error, respuesta) {
    if (respuesta) {
      var sqlComp =
        "SELECT * FROM competencias where id =" + competenciaId + ";";
      conDb.query(sqlComp, function(error, respuesta) {
        if (respuesta) {
          var sqlVoto =
            "SELECT * FROM votos_pelicula where competencia_id=" +
            competenciaId +
            " AND pelicula_id=" +
            peliculaId +
            ";";
          conDb.query(sqlVoto, function(error, respSqlVoto) {
            if (respSqlVoto.length > 0) {
              var sql =
                "UPDATE votos_pelicula SET cantidad = cantidad +1 where competencia_id=" +
                competenciaId +
                " AND pelicula_id=" +
                peliculaId +
                ";";
              conDb.query(sql, function(error, respuestaVoto) {
                res.status(200).json("Voto agregado");
              });
            } else {
              var sql =
                "INSERT INTO votos_pelicula (competencia_id, pelicula_id, cantidad) values(+" +
                competenciaId +
                ", " +
                peliculaId +
                ", 1);";
              conDb.query(sql, function(error, respuestaVoto) {
                res.status(200).json("Voto agregado");
              });
            }
          });
        } else {
          return res.status(404).json("Competencia no encontrada");
        }
      });
    } else {
      return res.status(404).json("Pelicula no encontrada");
    }
  });
}

function obtenerResultados(id, res) {
  sqlVComp = "SELECT * FROM competencias where id=" + id + ";";
  conDb.query(sqlVComp, function(error, resultComp) {
    if (error) {
      return res.status(500);
    } else if (resultComp) {
      sql =
        "SELECT pelicula_id, titulo, poster, cantidad as votos FROM votos_pelicula vot JOIN pelicula p ON vot.pelicula_id = pelicula_id.id JOIN competencias c ON vot.competencia_id=c.id WHERE c.id=" +
        id +
        " order by cantidad DESC LIMIT 3;";
      conDb.query(sql, function(error, resp) {
        if (error) {
          return res.status(500);
        } else {
          var data = {
            competencia: resultComp[0].titulo,
            resultados: resp
          };
          res.send(data);
        }
      });
    } else {
      return res.status(404).json("Competencia no encontrada");
    }
  });
}

module.exports = {
  obtenerCompetencias: obtenerCompetencias,
  obtenerOpciones: obtenerOpciones,
  votar: votar,
  obtenerResultados: obtenerResultados
};
