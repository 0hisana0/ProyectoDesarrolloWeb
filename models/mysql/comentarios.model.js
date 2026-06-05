import { pool } from './db.js'

export class ComentariosModel {

  static getByPublicacion = async ({ id_publicacion }) => {
    const [rows] = await pool.execute(
      `SELECT c.*, u.nombre, u.foto_perfil
      FROM Comentario c
      INNER JOIN Usuario u ON c.id_usuario = u.id_usuario
      WHERE c.id_publicacion = ?
      ORDER BY c.fecha_comentario ASC`,
      [id_publicacion]
    )
    return rows
  }

  static create = async ({ input }) => {
    const { id_publicacion, id_usuario, contenido } = input

    const [result] = await pool.execute(
      `INSERT INTO Comentario (id_publicacion, id_usuario, contenido)
       VALUES (?, ?, ?)`,
      [id_publicacion, id_usuario, contenido]
    )

    const [rows] = await pool.execute(
      `SELECT c.*, u.nombre, u.foto_perfil
      FROM Comentario c
      INNER JOIN Usuario u ON c.id_usuario = u.id_usuario
      WHERE c.id_comentario = ?`,
      [result.insertId]
    )

    return rows[0]
  }

  static delete = async ({ id, id_usuario }) => {
    const [rows] = await pool.execute(
      'SELECT * FROM Comentario WHERE id_comentario = ? AND id_usuario = ?',
      [id, id_usuario]
    )

    if (rows.length === 0) return false

    await pool.execute('DELETE FROM Comentario WHERE id_comentario = ?', [id])

    return rows[0]
  }
}
