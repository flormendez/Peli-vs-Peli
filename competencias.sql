USE `competencias`;

DROP TABLE IF EXISTS `competencias`;

CREATE TABLE `competencias`
(
  `id` int
(11) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(70) NOT NULL DEFAULT '',
  `genero_id` int(11),
  `actor_id` int(11),
  `director` int(11),
  PRIMARY KEY(`id`)
)  ENGINE=InnoDB DEFAULT CHARSET=UTF8;
LOCK TABLES `competencias` WRITE;
INSERT INTO `competencias`
VALUES
    (1, 'Cual es tu película favorita?', NULL, NULL, NULL),
    (2, 'Cual es la mejor peli de Steven Spielberg', NULL, NULL, 3364),
    (3, 'Cual es la mejor peli de terror? ', 10, NULL, NULL),
    (4, 'Cual es la mejor peli animada?', 3, NULL, NULL),
    (5, 'Cual es la mejor peli con Brad Pitt?', NULL, 227, NULL),
    (6, 'Cual es la mejor peli de Ciencia Ficción?', 13, NULL, NULL);
UNLOCK TABLES;


USE `competencias`;

DROP TABLE IF EXISTS `votos_pelicula`;

CREATE TABLE `votos_pelicula`
(
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `competencia_id` int(11) NOT NULL,
  `pelicula_id` int(11) NOT NULL,
  PRIMARY KEY(`id`)
)  ENGINE=InnoDB DEFAULT CHARSET=UTF8;



