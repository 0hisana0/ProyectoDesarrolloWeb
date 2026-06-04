import { UsuariosModel } from '../models/mysql/usuarios.model.js'

export class AuthController {

  // GET /login
  static loginView = (req, res) => {
    // Si ya tiene sesión activa, redirigir al inicio
    if (req.session.usuario) return res.redirect('/')
    res.render('login', { error: null })
  }

  // GET /register
  static registerView = (req, res) => {
    if (req.session.usuario) return res.redirect('/')
    res.render('register')
  }

  // POST /login
  static login = async (req, res) => {
    const resultado = await UsuariosModel.login({ input: req.body })

    if (resultado.error) {
      return res.status(401).json({ error: resultado.error })
    }

    // Guardar usuario en sesión (sin password)
    req.session.usuario = {
      id: resultado.id,
      nombre: resultado.nombre,
      email: resultado.email,
      rol: resultado.rol
    }

    res.json({ ok: true })
  }

  // POST /register
  static register = async (req, res) => {
    const resultado = await UsuariosModel.register({ input: req.body })

    if (resultado.error) {
      return res.status(400).json({ error: resultado.error })
    }

    res.status(201).json({ ok: true })
  }

  // POST /logout
  static logout = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: 'Error al cerrar sesión' })
      }
      res.clearCookie('connect.sid')
      res.redirect('/login')
    })
  }
}