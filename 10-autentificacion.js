import 'dotenv/config'
import express from 'express'
import session from 'express-session'
import MySQLStore from 'express-mysql-session'
import { pool } from './models/mysql/db.js'
import path from 'path'
import { fileURLToPath } from 'url'

import authRoutes from './routes/auth.routes.js'
import publicacionRoutes from './routes/publicacion.routes.js'
import reaccionRoutes from './routes/reaccion.routes.js'
import comentarioRoutes from './routes/comentario.routes.js'
import perfilRoutes from './routes/perfil.routes.js'

import { requireAuth } from './middlewares/auth.middleware.js'
import { setLocals } from './middlewares/auth.middleware.js'
import { noCache } from './middlewares/auth.middleware.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

const MySQLStoreSession = MySQLStore(session)

const sessionStore = new MySQLStoreSession({
  createDatabaseTable: true
}, pool)

app.use(session({
  secret: process.env.SESSION_SECRET ?? 'secreto_local_cambiar',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  }
}))

app.use(setLocals)

app.use('/', authRoutes)
app.use('/feed', requireAuth, noCache, publicacionRoutes)
app.use('/reaccion', reaccionRoutes)
app.use('/comentario', comentarioRoutes)
app.use('/perfil', requireAuth, noCache, perfilRoutes)

app.get('/', requireAuth, noCache, (req, res) => {
  res.redirect('/feed')
})

app.use((req, res) => {
  res.status(404).send('El recurso solicitado no existe ...')
})

const puerto = process.env.PORT ?? 3000

app.listen(puerto, () => {
  console.log(`Servidor RedSocial escuchando en http://localhost:${puerto}`)
})
