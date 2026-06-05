import { PublicacionesModel } from '../models/mysql/publicaciones.model.js'
import { ReaccionesModel } from '../models/mysql/reacciones.model.js'
import { ComentariosModel } from '../models/mysql/comentarios.model.js'
import { UsuariosModel } from '../models/mysql/usuarios.model.js'

export class PublicacionController {

  static feed = async (req, res) => {
    const publicaciones = await PublicacionesModel.getAll()

    const publicacionesConReaccion = await Promise.all(
      publicaciones.map(async (pub) => {
        const yaReacciono = await ReaccionesModel.hasUserReacted({
          id_usuario: req.session.usuario.id,
          id_publicacion: pub.id_publicacion
        })
        const comentarios = await ComentariosModel.getByPublicacion({
          id_publicacion: pub.id_publicacion
        })
        return { ...pub, yaReacciono, comentarios }
      })
    )

    res.render('feed', { publicaciones: publicacionesConReaccion })
  }

  static create = async (req, res) => {
    const { contenido } = req.body
    const imagen = req.file ? req.file.filename : null

    const publicacion = await PublicacionesModel.create({
      input: {
        id_usuario: req.session.usuario.id,
        contenido,
        imagen
      }
    })

    res.status(201).json({ ok: true, publicacion })
  }

  static delete = async (req, res) => {
    const { id } = req.params

    const eliminado = await PublicacionesModel.delete({
      id,
      id_usuario: req.session.usuario.id
    })

    if (!eliminado) {
      return res.status(404).json({ error: 'Publicación no encontrada o no autorizada' })
    }

    res.json({ ok: true })
  }

  static perfil = async (req, res) => {
    const usuario = await UsuariosModel.getById({ id: req.session.usuario.id })
    const publicaciones = await PublicacionesModel.getByUser({
      id_usuario: req.session.usuario.id
    })

    const publicacionesConReaccion = await Promise.all(
      publicaciones.map(async (pub) => {
        const yaReacciono = await ReaccionesModel.hasUserReacted({
          id_usuario: req.session.usuario.id,
          id_publicacion: pub.id_publicacion
        })
        const comentarios = await ComentariosModel.getByPublicacion({
          id_publicacion: pub.id_publicacion
        })
        return { ...pub, yaReacciono, comentarios }
      })
    )

    res.render('perfil', { usuario, publicaciones: publicacionesConReaccion })
  }

  static verPerfil = async (req, res) => {
    const { id } = req.params
    const usuario = await UsuariosModel.getById({ id })

    if (!usuario) {
      return res.status(404).render('feed', { error: 'Usuario no encontrado' })
    }

    const publicaciones = await PublicacionesModel.getByUser({ id_usuario: id })

    const publicacionesConReaccion = await Promise.all(
      publicaciones.map(async (pub) => {
        const yaReacciono = req.session.usuario
          ? await ReaccionesModel.hasUserReacted({
              id_usuario: req.session.usuario.id,
              id_publicacion: pub.id_publicacion
            })
          : false
        const comentarios = await ComentariosModel.getByPublicacion({
          id_publicacion: pub.id_publicacion
        })
        return { ...pub, yaReacciono, comentarios }
      })
    )

    res.render('perfil', { usuario, publicaciones: publicacionesConReaccion })
  }
}
