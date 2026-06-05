import { pool } from './db.js'
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

export class UsuariosModel {

  static register = async ({ input }) => {
    const { nombre, email, password } = input

    const [existe] = await pool.execute(
      'SELECT id_usuario FROM Usuario WHERE email = ?',
      [email]
    )

    if (existe.length > 0) {
      return { error: 'El email ya está registrado' }
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS)

    const [result] = await pool.execute(
      `INSERT INTO Usuario (nombre, email, password)
       VALUES (?, ?, ?)`,
      [nombre, email, hash]
    )

    const [rows] = await pool.execute(
      'SELECT id_usuario, nombre, email, foto_perfil, biografia FROM Usuario WHERE id_usuario = ?',
      [result.insertId]
    )

    return rows[0]
  }

  static login = async ({ input }) => {
    const { email, password } = input

    const [rows] = await pool.execute(
      'SELECT * FROM Usuario WHERE email = ? AND activo = 1',
      [email]
    )

    if (rows.length === 0) {
      return { error: 'Credenciales incorrectas' }
    }

    const usuario = rows[0]

    const passwordValido = await bcrypt.compare(password, usuario.password)

    if (!passwordValido) {
      return { error: 'Credenciales incorrectas' }
    }

    const { password: _, ...usuarioSeguro } = usuario

    return usuarioSeguro
  }

  static getById = async ({ id }) => {
    const [rows] = await pool.execute(
      'SELECT id_usuario, nombre, email, foto_perfil, biografia, fecha_registro FROM Usuario WHERE id_usuario = ? AND activo = 1',
      [id]
    )

    return rows[0] ?? null
  }

  static updatePerfil = async ({ id, input }) => {
    const campos = Object.keys(input)
      .map(key => `${key} = ?`).join(', ')

    const valores = [...Object.values(input), id]

    const [result] = await pool.execute(
      `UPDATE Usuario SET ${campos} WHERE id_usuario = ?`,
      valores
    )

    if (result.affectedRows === 0) return false

    const [rows] = await pool.execute(
      'SELECT id_usuario, nombre, email, foto_perfil, biografia FROM Usuario WHERE id_usuario = ?',
      [id]
    )

    return rows[0]
  }
}
