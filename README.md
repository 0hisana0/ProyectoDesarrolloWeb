# CursosDB API

API REST con interfaz web para gestionar cursos de programación, matemáticas y bases de datos. Construida con Node.js, Express y EJS, con soporte para dos modelos de datos intercambiables: sistema de archivos local y MySQL.

---

## Tecnologías

- **Node.js** con ES Modules (`"type": "module"`)
- **Express** — servidor y enrutamiento
- **EJS** — plantillas del lado del servidor
- **Zod** — validación de datos
- **mysql2** — cliente MySQL con soporte de promesas
- **dotenv** — variables de entorno

---

## Estructura del proyecto

```
├── 9-bd.js                          # Entry point
├── .env                             # Variables de entorno (no subir a git)
├── .gitignore
├── package.json
│
├── routes/
│   ├── cursos.routes.js             # Rutas API REST
│   └── views.routes.js              # Rutas de vistas EJS
│
├── controllers/
│   ├── cursos.controller.js         # Controlador API
│   └── cursos.view-controller.js    # Controlador de vistas
│
├── models/
│   ├── index.js                     # Selector de modelo según DB env
│   ├── mysql/
│   │   ├── db.js                    # Pool de conexiones MySQL
│   │   └── cursos.model.js          # Modelo MySQL
│   └── local-file-system/
│       └── cursos.model.js          # Modelo JSON local
│
├── schemas/
│   └── cursos.schema.js             # Schemas de validación Zod
│
├── middlewares/
│   └── validate.js                  # Middlewares validateBody y validateParams
│
├── data/
│   └── cursos.json                  # Base de datos local
│
└── views/
    ├── index.ejs                    # Página de inicio
    ├── cursos.ejs                   # Listado general con tabs
    ├── programacion.ejs             # CRUD programación
    ├── matematicas.ejs              # CRUD matemáticas
    ├── bases_de_datos.ejs           # CRUD bases de datos
    └── partials/
        ├── head.ejs                 # Meta, estilos compartidos
        └── navbar.ejs               # Navegación
```

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd cursosdb
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Modelo de datos: 'local' (archivo JSON) o 'mysql'
DB=local

# Puerto del servidor (opcional, por defecto 3000)
PORT=3000
```

### 4. Configurar MySQL (solo si DB=mysql)

Asegúrate de tener MySQL corriendo y crea la base de datos:

```sql
CREATE DATABASE cursosdb;
USE cursosdb;

CREATE TABLE programacion (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  lenguaje VARCHAR(100) NOT NULL,
  vistas INT DEFAULT 0,
  nivel ENUM('basico', 'intermedio', 'avanzado') NOT NULL,
  timestamp BIGINT
);

CREATE TABLE matematicas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  tema VARCHAR(100) NOT NULL,
  vistas INT DEFAULT 0,
  nivel ENUM('basico', 'intermedio', 'avanzado') NOT NULL,
  timestamp BIGINT
);

CREATE TABLE bases_de_datos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  tecnologia VARCHAR(100) NOT NULL,
  vistas INT DEFAULT 0,
  nivel ENUM('basico', 'intermedio', 'avanzado') NOT NULL,
  timestamp BIGINT
);
```

Luego actualiza las credenciales en `models/mysql/db.js`:

```js
export const pool = await mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'tu_password',
  database: 'cursosdb'
})
```

### 5. Iniciar el servidor

```bash
node 9-bd.js
```

El servidor quedará disponible en `http://localhost:3000`.

---

## Cambiar modelo de datos

El modelo se selecciona con la variable `DB` del archivo `.env`:

```env
DB=local    # Usa data/cursos.json
DB=mysql    # Usa MySQL
```

No es necesario modificar ningún controlador ni ruta al cambiar de modelo.

---

## Endpoints API REST

Base URL: `http://localhost:3000/cursos`

### Programación

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/programacion` | Obtener todos los cursos |
| POST | `/programacion` | Crear un curso |
| PUT | `/programacion/:id` | Actualizar un curso completo |
| PATCH | `/programacion/:id` | Actualizar campos parciales |
| DELETE | `/programacion/:id` | Eliminar un curso |

### Matemáticas

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/matematicas` | Obtener todos los cursos |
| POST | `/matematicas` | Crear un curso |
| PUT | `/matematicas/:id` | Actualizar un curso completo |
| PATCH | `/matematicas/:id` | Actualizar campos parciales |
| DELETE | `/matematicas/:id` | Eliminar un curso |

### Bases de datos

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/bases_de_datos` | Obtener todos los cursos |
| POST | `/bases_de_datos` | Crear un curso |
| PUT | `/bases_de_datos/:id` | Actualizar un curso completo |
| PATCH | `/bases_de_datos/:id` | Actualizar campos parciales |
| DELETE | `/bases_de_datos/:id` | Eliminar un curso |

### Cuerpo esperado por categoría

**Programación**
```json
{
  "titulo": "Aprende JavaScript",
  "lenguaje": "javascript",
  "vistas": 0,
  "nivel": "basico"
}
```

**Matemáticas**
```json
{
  "titulo": "Aprende Cálculo",
  "tema": "cálculo",
  "vistas": 0,
  "nivel": "basico"
}
```

**Bases de datos**
```json
{
  "titulo": "Introducción a SQL",
  "tecnologia": "SQL",
  "vistas": 0,
  "nivel": "basico"
}
```

> `nivel` acepta únicamente: `basico`, `intermedio`, `avanzado`

---

## Vistas

Base URL: `http://localhost:3000`

| Ruta | Descripción |
|------|-------------|
| `/` | Página de inicio con estadísticas |
| `/cursos-view` | Listado general de todos los cursos |
| `/cursos-view/programacion` | CRUD de cursos de programación |
| `/cursos-view/matematicas` | CRUD de cursos de matemáticas |
| `/cursos-view/bases_de_datos` | CRUD de cursos de bases de datos |

---

## Validaciones

Todos los endpoints POST, PUT y PATCH validan el cuerpo de la petición con Zod. En caso de error retornan:

```json
{
  "error": ["El titulo es obligatorio", "El nivel debe ser: básico, intermedio, avanzado"]
}
```

Los parámetros `:id` también se validan — deben ser números enteros positivos.

---

## .gitignore recomendado

```
.env
node_modules
```

