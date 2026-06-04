//import { CursosModel } from '../models/local-file-system/cursos.model.js'
//import { CursosModel } from '../models/mysql/cursos.model.js'
import { CursosModel } from '../models/index.js'


export class CursosController {

  static getAll = async (req, res) => {
    res.json(await CursosModel.getAll())
  }

  static getAllProgramacion = async (req, res) => {
    res.json(await CursosModel.getAllProgramacion())
  }

  static getAllMatematicas = async (req, res) => {
    res.json(await CursosModel.getAllMatematicas())
  }

  static getAllBD = async (req, res) => {
    res.json(await CursosModel.getAllBD())
  }

  static createProgramacion = async (req, res) => {
    const nuevoCurso = await CursosModel.createProgramacion({
      input: req.body
    })
    res.status(201).json(nuevoCurso)
  }

  static createMatematicas = async (req, res) => {
    const nuevoCurso = await CursosModel.createMatematicas({
      input: req.body
    })
    res.status(201).json(nuevoCurso)
  }

  static createBD = async (req, res) => {
    const nuevoCurso = await CursosModel.createBD({
      input: req.body
    })
    res.status(201).json(nuevoCurso)
  }

  static updateProgramacion = async (req, res) => {
    const { id } = req.params

    const cursoActualizado = await CursosModel.updateProgramacion({
      id,
      input: req.body
    })

    if (!cursoActualizado) {
      return res.status(404).json({
        mensaje: 'Curso no encontrado'
      })
    }

    res.json(cursoActualizado)
  }

  static updateMatematicas = async (req, res) => {
    const { id } = req.params

    const cursoActualizado = await CursosModel.updateMatematicas({
      id,
      input: req.body
    })

    if (!cursoActualizado) {
      return res.status(404).json({
        mensaje: 'Curso no encontrado'
      })
    }

    res.json(cursoActualizado)
  }

  static updateBD = async (req, res) => {
    const { id } = req.params

    const cursoActualizado = await CursosModel.updateBD({
      id,
      input: req.body
    })

    if (!cursoActualizado) {
      return res.status(404).json({
        mensaje: 'Curso no encontrado'
      })
    }

    res.json(cursoActualizado)
  }

  static patchProgramacion = async (req, res) => {
    const { id } = req.params

    const cursoActualizado = await CursosModel.patchProgramacion({
      id,
      input: req.body
    })

    if (!cursoActualizado) {
      return res.status(404).json({
        mensaje: 'Curso no encontrado'
      })
    }

    res.json(cursoActualizado)
  }

  static patchMatematicas = async (req, res) => {
    const { id } = req.params

    const cursoActualizado = await CursosModel.patchMatematicas({
      id,
      input: req.body
    })

    if (!cursoActualizado) {
      return res.status(404).json({
        mensaje: 'Curso no encontrado'
      })
    }

    res.json(cursoActualizado)
  }

  static patchBD = async (req, res) => {
    const { id } = req.params

    const cursoActualizado = await CursosModel.patchBD({
      id,
      input: req.body
    })

    if (!cursoActualizado) {
      return res.status(404).json({
        mensaje: 'Curso no encontrado'
      })
    }

    res.json(cursoActualizado)
  }

  static deleteProgramacion = async (req, res) => {
    const { id } = req.params
    const eliminado = await CursosModel.deleteProgramacion({ id })

    if (!eliminado) {
      return res.status(404).json({
        mensaje: 'Curso no encontrado'
      })
    }

    res.json({
      mensaje: 'Curso eliminado',
      curso: eliminado
    })
  }

  static deleteMatematicas = async (req, res) => {
    const { id } = req.params
    const eliminado = await CursosModel.deleteMatematicas({ id })

    if (!eliminado) {
      return res.status(404).json({
        mensaje: 'Curso no encontrado'
      })
    }

    res.json({
      mensaje: 'Curso eliminado',
      curso: eliminado
    })
  }

  static deleteBD = async (req, res) => {
    const { id } = req.params
    const eliminado = await CursosModel.deleteBD({ id })

    if (!eliminado) {
      return res.status(404).json({
        mensaje: 'Curso no encontrado'
      })
    }

    res.json({
      mensaje: 'Curso eliminado',
      curso: eliminado
    })
  }
}
