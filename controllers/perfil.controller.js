import { UsuariosModel } from '../models/mysql/usuarios.model.js'

export class PerfilController {

  static editView = async (req, res) => {
    const usuario = await UsuariosModel.getById({ id: req.session.usuario.id })
    res.render('editar_perfil', { usuario, error: null })
  }

  static update = async (req, res) => {
    const { nombre, biografia } = req.body
    const foto_perfil = req.file ? req.file.filename : undefined

    const input = {}
    if (nombre) input.nombre = nombre
    if (biografia !== undefined) input.biografia = biografia
    if (foto_perfil) input.foto_perfil = foto_perfil

    const actualizado = await UsuariosModel.updatePerfil({
      id: req.session.usuario.id,
      input
    })

    if (!actualizado) {
      return res.status(400).json({ error: 'Error al actualizar el perfil' })
    }

    req.session.usuario = {
      ...req.session.usuario,
      nombre: actualizado.nombre,
      foto_perfil: actualizado.foto_perfil
    }

    res.json({ ok: true, usuario: actualizado })
  }
}
