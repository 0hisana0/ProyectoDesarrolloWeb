import { pool } from './db.js'

export class CursosModel {

  // Obtener todos los cursos
  static getAll = async () => {
    const [programacion] = await pool.execute('SELECT * FROM programacion')
    const [matematicas] = await pool.execute('SELECT * FROM matematicas')
    const [bases_de_datos] = await pool.execute('SELECT * FROM bases_de_datos')

    return { programacion, matematicas, bases_de_datos }
  }

  // Obtener todos los cursos de Programacion
  static getAllProgramacion = async () => {
    const [rows] = await pool.execute('SELECT * FROM programacion')
    return rows
  }

  // Obtener todos los cursos de Matematicas
  static getAllMatematicas = async () => {
    const [rows] = await pool.execute('SELECT * FROM matematicas')
    return rows
  }

  // Obtener todos los cursos de Bases de datos
  static getAllBD = async () => {
    const [rows] = await pool.execute('SELECT * FROM bases_de_datos')
    return rows
  }

  // Crear un curso de programación
  static createProgramacion = async ({ input }) => {
    const { titulo, lenguaje, vistas, nivel } = input

    const [result] = await pool.execute(
      `INSERT INTO programacion (titulo, lenguaje, vistas, nivel, timestamp)
       VALUES (?, ?, ?, ?, ?)`,
      [titulo, lenguaje, vistas, nivel, Date.now()]
    )

    const [rows] = await pool.execute(
      'SELECT * FROM programacion WHERE id = ?',
      [result.insertId]
    )

    return rows[0]
  }

  // Crear un curso de matemáticas
  static createMatematicas = async ({ input }) => {
    const { titulo, tema, vistas, nivel } = input

    const [result] = await pool.execute(
      `INSERT INTO matematicas (titulo, tema, vistas, nivel, timestamp)
       VALUES (?, ?, ?, ?, ?)`,
      [titulo, tema, vistas, nivel, Date.now()]
    )

    const [rows] = await pool.execute(
      'SELECT * FROM matematicas WHERE id = ?',
      [result.insertId]
    )

    return rows[0]
  }

  // Crear un curso de bases de datos
  static createBD = async ({ input }) => {
    const { titulo, tecnologia, vistas, nivel } = input

    const [result] = await pool.execute(
      `INSERT INTO bases_de_datos (titulo, tecnologia, vistas, nivel, timestamp)
       VALUES (?, ?, ?, ?, ?)`,
      [titulo, tecnologia, vistas, nivel, Date.now()]
    )

    const [rows] = await pool.execute(
      'SELECT * FROM bases_de_datos WHERE id = ?',
      [result.insertId]
    )

    return rows[0]
  }

  // Actualizar un curso de programacion
  static updateProgramacion = async ({ id, input }) => {
    const { titulo, lenguaje, vistas, nivel } = input
    const [result] = await pool.execute(
      `UPDATE programacion
       SET titulo = ?, lenguaje = ?, vistas = ?, nivel = ?
       WHERE id = ?`,
      [titulo, lenguaje, vistas, nivel, id]
    )
    if (result.affectedRows === 0) return false
    const [rows] = await pool.execute(
      'SELECT * FROM programacion WHERE id = ?', [id]
    )
    return rows[0]
  }

  // Actualizar un curso de matemáticas
  static updateMatematicas = async ({ id, input }) => {
    const { titulo, tema, vistas, nivel } = input

    const [result] = await pool.execute(
      `UPDATE matematicas
       SET titulo = ?, tema = ?, vistas = ?, nivel = ?
       WHERE id = ?`,
      [titulo, tema, vistas, nivel, id]
    )

    if (result.affectedRows === 0) return false

    const [rows] = await pool.execute(
      'SELECT * FROM matematicas WHERE id = ?', [id]
    )

    return rows[0]
  }

  // Actualizar un curso de bases de datos
  static updateBD = async ({ id, input }) => {
    const { titulo, tecnologia, vistas, nivel } = input

    const [result] = await pool.execute(
      `UPDATE bases_de_datos
       SET titulo = ?, tecnologia = ?, vistas = ?, nivel = ?
       WHERE id = ?`,
      [titulo, tecnologia, vistas, nivel, id]
    )

    if (result.affectedRows === 0) return false

    const [rows] = await pool.execute(
      'SELECT * FROM bases_de_datos WHERE id = ?', [id]
    )

    return rows[0]
  }

  // Actualización parcial de un curso de programacion
  static patchProgramacion = async ({ id, input }) => {
    const campos = Object.keys(input)
      .map(key => `${key} = ?`).join(', ')

    const valores = [...Object.values(input), id]

    const [result] = await pool.execute(
      `UPDATE programacion SET ${campos} WHERE id = ?`,
      valores
    )

    if (result.affectedRows === 0) return false

    const [rows] = await pool.execute(
      'SELECT * FROM programacion WHERE id = ?', [id]
    )

    return rows[0]
  }

  // Actualización parcial de un curso de matematicas
  static patchMatematicas = async ({ id, input }) => {
    const campos = Object.keys(input)
      .map(key => `${key} = ?`).join(', ')

    const valores = [...Object.values(input), id]

    const [result] = await pool.execute(
      `UPDATE matematicas SET ${campos} WHERE id = ?`,
      valores
    )

    if (result.affectedRows === 0) return false

    const [rows] = await pool.execute(
      'SELECT * FROM matematicas WHERE id = ?', [id]
    )

    return rows[0]
  }

  // Actualización parcial de un curso de bases de datos
  static patchBD = async ({ id, input }) => {
    const campos = Object.keys(input).map(key => `${key} = ?`).join(', ')
    const valores = [...Object.values(input), id]

    const [result] = await pool.execute(
      `UPDATE bases_de_datos SET ${campos} WHERE id = ?`,
      valores
    )

    if (result.affectedRows === 0) return false

    const [rows] = await pool.execute(
      'SELECT * FROM bases_de_datos WHERE id = ?', [id]
    )

    return rows[0]
  }

  // Borrar un curso de programacion
  static deleteProgramacion = async ({ id }) => {
    const [rows] = await pool.execute(
      'SELECT * FROM programacion WHERE id = ?', [id]
    )

    if (rows.length === 0) return false

    await pool.execute('DELETE FROM programacion WHERE id = ?', [id])

    return rows[0]
  }

  // Borrar un curso de matemáticas
  static deleteMatematicas = async ({ id }) => {
    const [rows] = await pool.execute(
      'SELECT * FROM matematicas WHERE id = ?', [id]
    )

    if (rows.length === 0) return false

    await pool.execute('DELETE FROM matematicas WHERE id = ?', [id])

    return rows[0]
  }

  // Borrar un curso de bases de datos
  static deleteBD = async ({ id }) => {
    const [rows] = await pool.execute(
      'SELECT * FROM bases_de_datos WHERE id = ?', [id]
    )

    if (rows.length === 0) return false

    await pool.execute('DELETE FROM bases_de_datos WHERE id = ?', [id])

    return rows[0]
  }
}