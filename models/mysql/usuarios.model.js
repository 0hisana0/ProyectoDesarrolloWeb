import { pool } from './db.js'
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

export class UsuariosModel {

  // Registrar un nuevo usuario
  static register = async ({ input }) => {
    const { nombre, email, password } = input

    // Verificar si el email ya existe
    const [existe] = await pool.execute(
      'SELECT id FROM usuarios WHERE email = ?',
      [email]
    )

    if (existe.length > 0) {
      return { error: 'El email ya está registrado' }
    }

    // Hashear la contraseña
    const hash = await bcrypt.hash(password, SALT_ROUNDS)

    const [result] = await pool.execute(
      `INSERT INTO usuarios (nombre, email, password)
       VALUES (?, ?, ?)`,
      [nombre, email, hash]
    )

    const [rows] = await pool.execute(
      'SELECT id, nombre, email, rol FROM usuarios WHERE id = ?',
      [result.insertId]
    )

    return rows[0]
  }

  // Iniciar sesión
  static login = async ({ input }) => {
    const { email, password } = input

    const [rows] = await pool.execute(
      'SELECT * FROM usuarios WHERE email = ? AND activo = 1',
      [email]
    )

    // Usuario no encontrado
    if (rows.length === 0) {
      return { error: 'Credenciales incorrectas' }
    }

    const usuario = rows[0]

    // Comparar contraseña con el hash
    const passwordValido = await bcrypt.compare(password, usuario.password)

    if (!passwordValido) {
      return { error: 'Credenciales incorrectas' }
    }

    // Nunca devolver el hash al controlador
    const { password: _, ...usuarioSeguro } = usuario

    return usuarioSeguro
  }

  // Buscar usuario por id (para verificar sesión activa)
  static getById = async ({ id }) => {
    const [rows] = await pool.execute(
      'SELECT id, nombre, email, rol FROM usuarios WHERE id = ? AND activo = 1',
      [id]
    )

    return rows[0] ?? null
  }
}