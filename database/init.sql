-- ==========================================
-- TABLA USUARIOS
-- ==========================================

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(20) DEFAULT 'user',
    activo TINYINT(1) DEFAULT 1,
    foto_perfil VARCHAR(255),
    biografia TEXT,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- TABLA PUBLICACION
-- ==========================================

CREATE TABLE Publicacion (
    id_publicacion INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    contenido TEXT NOT NULL,
    imagen VARCHAR(255),
    fecha_publicacion DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_publicacion_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id)
        ON DELETE CASCADE
);

-- ==========================================
-- TABLA COMENTARIO
-- ==========================================

CREATE TABLE Comentario (
    id_comentario INT AUTO_INCREMENT PRIMARY KEY,
    id_publicacion INT NOT NULL,
    id_usuario INT NOT NULL,
    contenido TEXT NOT NULL,
    fecha_comentario DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_comentario_publicacion
        FOREIGN KEY (id_publicacion)
        REFERENCES Publicacion(id_publicacion)
        ON DELETE CASCADE,

    CONSTRAINT fk_comentario_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id)
        ON DELETE CASCADE
);

-- ==========================================
-- TABLA LIKE
-- ==========================================

CREATE TABLE `Like` (
    id_like INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_publicacion INT NOT NULL,
    fecha_like DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_like_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_like_publicacion
        FOREIGN KEY (id_publicacion)
        REFERENCES Publicacion(id_publicacion)
        ON DELETE CASCADE,

    CONSTRAINT uq_like
        UNIQUE(id_usuario, id_publicacion)
);

-- ==========================================
-- INDICES PARA OPTIMIZACION
-- ==========================================

CREATE INDEX idx_publicacion_fecha
ON Publicacion(fecha_publicacion);

CREATE INDEX idx_comentario_publicacion
ON Comentario(id_publicacion);

CREATE INDEX idx_like_publicacion
ON `Like`(id_publicacion);

-- ==========================================
-- TABLA SESSIONS (express-mysql-session)
-- ==========================================

CREATE TABLE IF NOT EXISTS sessions (
    session_id VARCHAR(128) COLLATE utf8mb4_bin NOT NULL,
    expires INT(11) UNSIGNED NOT NULL,
    data MEDIUMTEXT COLLATE utf8mb4_bin,
    PRIMARY KEY (session_id)
);
