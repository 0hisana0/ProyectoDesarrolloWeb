import 'dotenv/config'
import express from 'express'
import session from 'express-session'
import MySQLStore from 'express-mysql-session'
import { pool } from './models/mysql/db.js'

import cursosRoutes from './routes/cursos.routes.js'
import viewsRoutes from './routes/cursos.views.routes.js'
import authRoutes from './routes/auth.routes.js'

import { requireAuth } from './middlewares/auth.middleware.js'
import { setLocals } from './middlewares/auth.middleware.js'
import { noCache } from './middlewares/no-cache.middleware.js'

const app = express()

// ── Motor de vistas ────────────────────────────────────────
app.set('view engine', 'ejs')
app.set('views', './views')

// ── Body parser ────────────────────────────────────────────
app.use(express.json())

// ── Sesiones con MySQL ─────────────────────────────────────
const MySQLStoreSession = MySQLStore(session)

const sessionStore = new MySQLStoreSession({
  createDatabaseTable: true  // crea la tabla sesiones automáticamente
}, pool)

app.use(session({
  secret: process.env.SESSION_SECRET ?? 'secreto_local_cambiar',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 24 horas
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  }
}))

// ── Variables globales para las vistas ─────────────────────
app.use(setLocals)

// ── Rutas públicas (sin autenticación) ────────────────────
app.use('/', authRoutes)

// ── Rutas protegidas ──────────────────────────────────────
app.use('/', requireAuth, noCache, viewsRoutes)
app.use('/cursos', requireAuth, noCache, cursosRoutes)

// ── 404 ───────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).send('El recurso solicitado no existe ...')
})

const puerto = process.env.PORT ?? 3000

app.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`)
})