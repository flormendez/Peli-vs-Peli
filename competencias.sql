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
    (2, 'Cual es la mejor peli de Fincher?', NULL, NULL, 3758),
    (3, 'Cual es la mejor peli de terror? ', 10, NULL, NULL),
    (4, 'Cual es la mejor peli con Clint Eastwood?', NULL, 362, NULL),
    (5, 'Cual es la mejor peli con Brad Pitt?', NULL, 227, NULL),
    (6, 'Cual es la mejor peli de David Lynch?', NULL, NULL, 3528);
UNLOCK TABLES;

