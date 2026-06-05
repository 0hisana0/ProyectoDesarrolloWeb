import { ComentariosModel } from '../models/mysql/comentarios.model.js'

export class ComentarioController {

  static create = async (req, res) => {
    const { id } = req.params
    const { contenido } = req.body

    const comentario = await ComentariosModel.create({
      input: {
        id_publicacion: id,
        id_usuario: req.session.usuario.id,
        contenido
      }
    })

    res.status(201).json({ ok: true, comentario })
  }

  static delete = async (req, res) => {
    const { id } = req.params

    const eliminado = await ComentariosModel.delete({
      id,
      id_usuario: req.session.usuario.id
    })

    if (!eliminado) {
      return res.status(404).json({ error: 'Comentario no encontrado o no autorizado' })
    }

    res.json({ ok: true })
  }
}
