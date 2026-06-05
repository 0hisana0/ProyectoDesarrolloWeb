import { ReaccionesModel } from '../models/mysql/reacciones.model.js'

export class ReaccionController {

  static toggle = async (req, res) => {
    const { id } = req.params

    const resultado = await ReaccionesModel.toggle({
      input: {
        id_usuario: req.session.usuario.id,
        id_publicacion: id
      }
    })

    const total = await ReaccionesModel.countByPublicacion({ id_publicacion: id })

    res.json({ ...resultado, total })
  }
}
