-- borrar base de datos si existe
DROP DATABASE IF EXISTS cursosdb;

-- creacion de la base de datos
CREATE DATABASE cursosdb;
USE cursosdb;

CREATE TABLE programacion (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  lenguaje VARCHAR(100) NOT NULL,
  vistas INT UNSIGNED DEFAULT 0,
  nivel ENUM('basico', 'intermedio', 'avanzado') NOT NULL,
  timestamp BIGINT
);

INSERT INTO programacion (titulo, lenguaje, vistas, nivel, timestamp) VALUES ('Aprende Python', 'python', 15000, 'basico', NOW()),
('Python intermedio', 'python', 13553, 'intermedio', NOW()),
('Aprende JavaScript', 'javascript', 102223, 'basico', NOW());

CREATE TABLE matematicas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  tema VARCHAR(100) NOT NULL,
  vistas INT UNSIGNED DEFAULT 0,
  nivel ENUM('basico', 'intermedio', 'avanzado') NOT NULL,
  timestamp BIGINT
);

INSERT INTO matematicas (titulo, tema, vistas, nivel, timestamp) VALUES ('Aprende Cálculo', 'cálculo', 12427, 'basico', NOW()),
('Aprende Álgebra', 'álgebra', 15722, 'intermedio', NOW());

CREATE TABLE bases_de_datos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  tecnologia VARCHAR(100) NOT NULL,
  vistas INT UNSIGNED DEFAULT 0,
  nivel ENUM('basico', 'intermedio', 'avanzado') NOT NULL,
  timestamp BIGINT
);

INSERT INTO bases_de_datos (titulo, tecnologia, vistas, nivel, timestamp)
VALUES ('Introducción a SQL', 'SQL', 18200, 'basico', NOW()),
('Modelado de Bases de Datos', 'modelado', 9800, 'intermedio', NOW());

-- Para probar que se insertaron correctamente los valores
-- SELECT * FROM programacion;
-- SELECT * FROM matematicas;
-- SELECT * FROM bases_de_datos;
