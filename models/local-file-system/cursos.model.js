import fs from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_PATH = path.join(__dirname, '../../data/cursos.json')

// Helpers privados de lectura/escritura
const leerCursos = async () => {
  const data = await fs.readFile(DATA_PATH, 'utf-8')
  return JSON.parse(data)
}

const guardarCursos = async (cursos) => {
  await fs.writeFile(DATA_PATH, JSON.stringify(cursos, null, 2), 'utf-8')
}

export class CursosModel {

  // Obtener todos los cursos
  static getAll = async () => {
    return await leerCursos()
    // return cursos
  }

  // Obtener todos los cursos de Programacion
  static getAllProgramacion = async () => {
    const cursos = await leerCursos()
    return cursos.programacion
    // return cursos.programacion
  }

  // Obtener todos los cursos de Matematicas
  static getAllMatematicas = async () => {
    const cursos = await leerCursos()
    return cursos.matematicas
    // return cursos.matematicas
  }

  // Obtener todos los cursos de Bases de datos
  static getAllBD = async () => {
    const cursos = await leerCursos()
    return cursos.bases_de_datos
    // return cursos.bases_de_datos
  }

  // Crear un curso de programación
  static createProgramacion = async ({ input }) => {
    const cursos = await leerCursos() // nueva linea
    const nuevoCurso = {
      id: cursos.programacion.at(-1)?.id + 1 || 1,
      ...input,
      timestamp: Date.now()
    }

    cursos.programacion.push(nuevoCurso)
    await guardarCursos(cursos) // nueva linea
    return nuevoCurso
  }

  // Crear un curso de matemáticas
  static createMatematicas = async ({ input }) => {
    const cursos = await leerCursos() // nueva linea
    const nuevoCurso = {
      id: cursos.matematicas.at(-1)?.id + 1 || 1,
      ...input,
      timestamp: Date.now()
    }

    cursos.matematicas.push(nuevoCurso)
    await guardarCursos(cursos) // nueva linea
    return nuevoCurso
  }

  // Crear un curso de bases de datos
  static createBD = async ({ input }) => {
    const cursos = await leerCursos() // nueva linea
    const nuevoCurso = {
      id: cursos.bases_de_datos.at(-1)?.id + 1 || 1,
      ...input,
      timestamp: Date.now()
    }

    cursos.bases_de_datos.push(nuevoCurso)
    await guardarCursos(cursos) // nueva linea
    return nuevoCurso
  }

  // Actualizar un curso de programacion
  static updateProgramacion = async ({ id, input }) => {
    const cursos = await leerCursos() // nueva linea
    const index = cursos.programacion.findIndex(c => c.id === id)
    if (index === -1) return false

    cursos.programacion[index] = {
      id,
      ...input
    }

    await guardarCursos(cursos) // nueva linea

    return cursos.programacion[index]
  }

  // Actualizar un curso de matemáticas
  static updateMatematicas = async ({ id, input }) => {
    const cursos = await leerCursos() // nueva linea
    const index = cursos.matematicas.findIndex(c => c.id === id)
    if (index === -1) return false

    cursos.matematicas[index] = {
      id,
      ...input
    }

    await guardarCursos(cursos) // nueva linea

    return cursos.matematicas[index]
  }

  // Actualizar un curso de bases de datos
  static updateBD = async ({ id, input }) => {
    const cursos = await leerCursos() // nueva linea
    const index = cursos.bases_de_datos.findIndex(c => c.id === id)
    if (index === -1) return false

    cursos.bases_de_datos[index] = {
      id,
      ...input
    }
    await guardarCursos(cursos) // nueva linea
    return cursos.bases_de_datos[index]
  }

  // Actualización parcial de un curso de programacion
  static patchProgramacion = async ({ id, input }) => {
    const cursos = await leerCursos() // nueva linea
    const curso = cursos.programacion.find(c => c.id === id)
    if (!curso) return false
    Object.assign(curso, input)
    await guardarCursos(cursos) // nueva linea
    return curso
  }

  // Actualización parcial de un curso de matematicas
  static patchMatematicas = async ({ id, input }) => {
    const cursos = await leerCursos() // nueva linea
    const curso = cursos.matematicas.find(c => c.id === id)
    if (!curso) return false
    Object.assign(curso, input)
    await guardarCursos(cursos) // nueva linea
    return curso
  }

  // Actualización parcial de un curso de bases de datos
  static patchBD = async ({ id, input }) => {
    const cursos = await leerCursos() // nueva linea
    const curso = cursos.bases_de_datos.find(c => c.id === id)
    if (!curso) return false
    Object.assign(curso, input)
    await guardarCursos(cursos) // nueva linea
    return curso
  }

  // Borrar un curso de programacion
  static deleteProgramacion = async ({ id }) => {
    const cursos = await leerCursos() // nueva linea
    const index = cursos.programacion.findIndex(c => c.id === id)
    if (index === -1) return false
    const eliminado = cursos.programacion.splice(index, 1)
    await guardarCursos(cursos) // nueva linea
    return eliminado[0]
  }

  // Borrar un curso de matemáticas
  static deleteMatematicas = async ({ id }) => {
    const cursos = await leerCursos() // nueva linea
    const index = cursos.matematicas.findIndex(c => c.id === id)
    if (index === -1) return false
    const eliminado = cursos.matematicas.splice(index, 1)
    await guardarCursos(cursos) // nueva linea
    return eliminado[0]
  }

  // Borrar un curso de bases de datos
  static deleteBD = async ({ id }) => {
    const cursos = await leerCursos() // nueva linea
    const index = cursos.bases_de_datos.findIndex(c => c.id === id)
    if (index === -1) return false
    const eliminado = cursos.bases_de_datos.splice(index, 1)
    await guardarCursos(cursos) // nueva linea
    return eliminado[0]
  }
}