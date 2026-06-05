import { pool } from './db.js'

export class PublicacionesModel {

  static getAll = async () => {
    const [rows] = await pool.execute(
      `SELECT p.*, u.nombre, u.foto_perfil,
        (SELECT COUNT(*) FROM Reaccion WHERE id_publicacion = p.id_publicacion) AS total_reacciones,
        (SELECT COUNT(*) FROM Comentario WHERE id_publicacion = p.id_publicacion) AS total_comentarios
      FROM Publicacion p
      INNER JOIN Usuario u ON p.id_usuario = u.id_usuario
      ORDER BY p.fecha_publicacion DESC`
    )
    return rows
  }

  static getById = async ({ id }) => {
    const [rows] = await pool.execute(
      `SELECT p.*, u.nombre, u.foto_perfil,
        (SELECT COUNT(*) FROM Reaccion WHERE id_publicacion = p.id_publicacion) AS total_reacciones,
        (SELECT COUNT(*) FROM Comentario WHERE id_publicacion = p.id_publicacion) AS total_comentarios
      FROM Publicacion p
      INNER JOIN Usuario u ON p.id_usuario = u.id_usuario
      WHERE p.id_publicacion = ?`,
      [id]
    )
    return rows[0] ?? null
  }

  static getByUser = async ({ id_usuario }) => {
    const [rows] = await pool.execute(
      `SELECT p.*, u.nombre, u.foto_perfil,
        (SELECT COUNT(*) FROM Reaccion WHERE id_publicacion = p.id_publicacion) AS total_reacciones,
        (SELECT COUNT(*) FROM Comentario WHERE id_publicacion = p.id_publicacion) AS total_comentarios
      FROM Publicacion p
      INNER JOIN Usuario u ON p.id_usuario = u.id_usuario
      WHERE p.id_usuario = ?
      ORDER BY p.fecha_publicacion DESC`,
      [id_usuario]
    )
    return rows
  }

  static create = async ({ input }) => {
    const { id_usuario, contenido, imagen } = input

    const [result] = await pool.execute(
      `INSERT INTO Publicacion (id_usuario, contenido, imagen)
       VALUES (?, ?, ?)`,
      [id_usuario, contenido, imagen ?? null]
    )

    return await PublicacionesModel.getById({ id: result.insertId })
  }

  static delete = async ({ id, id_usuario }) => {
    const [rows] = await pool.execute(
      'SELECT * FROM Publicacion WHERE id_publicacion = ? AND id_usuario = ?',
      [id, id_usuario]
    )

    if (rows.length === 0) return false

    await pool.execute('DELETE FROM Publicacion WHERE id_publicacion = ?', [id])

    return rows[0]
  }
}
