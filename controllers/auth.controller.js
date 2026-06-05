import { UsuariosModel } from '../models/mysql/usuarios.model.js'

export class AuthController {

  static loginView = (req, res) => {
    if (req.session.usuario) return res.redirect('/')
    res.render('login', { error: null })
  }

  static registerView = (req, res) => {
    if (req.session.usuario) return res.redirect('/')
    res.render('register')
  }

  static login = async (req, res) => {
    const resultado = await UsuariosModel.login({ input: req.body })

    if (resultado.error) {
      return res.status(401).json({ error: resultado.error })
    }

    req.session.usuario = {
      id: resultado.id_usuario,
      nombre: resultado.nombre,
      email: resultado.email,
      foto_perfil: resultado.foto_perfil
    }

    res.json({ ok: true })
  }

  static register = async (req, res) => {
    const resultado = await UsuariosModel.register({ input: req.body })

    if (resultado.error) {
      return res.status(400).json({ error: resultado.error })
    }

    res.status(201).json({ ok: true })
  }

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
