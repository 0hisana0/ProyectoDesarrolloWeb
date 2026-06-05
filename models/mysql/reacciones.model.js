import { pool } from './db.js'

export class ReaccionesModel {

  static toggle = async ({ input }) => {
    const { id_usuario, id_publicacion } = input

    const [existe] = await pool.execute(
      'SELECT id_reaccion FROM Reaccion WHERE id_usuario = ? AND id_publicacion = ?',
      [id_usuario, id_publicacion]
    )

    if (existe.length > 0) {
      await pool.execute(
        'DELETE FROM Reaccion WHERE id_usuario = ? AND id_publicacion = ?',
        [id_usuario, id_publicacion]
      )
      return { reaccionado: false }
    }

    await pool.execute(
      `INSERT INTO Reaccion (id_usuario, id_publicacion)
       VALUES (?, ?)`,
      [id_usuario, id_publicacion]
    )

    return { reaccionado: true }
  }

  static hasUserReacted = async ({ id_usuario, id_publicacion }) => {
    const [rows] = await pool.execute(
      'SELECT id_reaccion FROM Reaccion WHERE id_usuario = ? AND id_publicacion = ?',
      [id_usuario, id_publicacion]
    )
    return rows.length > 0
  }

  static countByPublicacion = async ({ id_publicacion }) => {
    const [rows] = await pool.execute(
      'SELECT COUNT(*) AS total FROM Reaccion WHERE id_publicacion = ?',
      [id_publicacion]
    )
    return rows[0].total
  }
}
