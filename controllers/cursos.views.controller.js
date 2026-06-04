// import { CursosModel } from '../models/mysql/cursos.model.js'
import { CursosModel } from '../models/index.js'

export class CursosViewsController {

  static index = async (req, res) => {
    const todos = await CursosModel.getAll()
    res.render('index', {
      totalProgramacion: todos.programacion.length,
      totalMatematicas: todos.matematicas.length,
      totalBD: todos.bases_de_datos.length
    })
  }

  static cursos = async (req, res) => {
    const todos = await CursosModel.getAll()
    res.render('cursos', {
      programacion: todos.programacion,
      matematicas: todos.matematicas,
      bases_de_datos: todos.bases_de_datos
    })
  }

  static programacion = async (req, res) => {
    const cursos = await CursosModel.getAllProgramacion()
    res.render('programacion', { cursos })
  }

  static matematicas = async (req, res) => {
    const cursos = await CursosModel.getAllMatematicas()
    res.render('matematicas', { cursos })
  }

  static basesDeDatos = async (req, res) => {
    const cursos = await CursosModel.getAllBD()
    res.render('bases_de_datos', { cursos })
  }
}