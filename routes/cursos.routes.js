import { Router } from 'express'
import { CursosController } from '../controllers/cursos.controller.js'
import {
  cursoMatematicasSchema,
  cursoMatematicasPatchSchema,
  cursoProgramacionSchema,
  cursoProgramacionPatchSchema,
  cursoBDSchema,
  cursoBDPatchSchema,
  idParamSchema
} from '../schemas/cursos.schema.js'

import {
  validateBody,
  validateParams
} from '../middlewares/validate.js'

import { requireAdmin } from '../middlewares/auth.middleware.js'

const router = Router()

// GET
router.get('/', CursosController.getAll)
router.get('/programacion', CursosController.getAllProgramacion)
router.get('/matematicas', CursosController.getAllMatematicas)
router.get('/bases_de_datos', CursosController.getAllBD)

// POST
router.post('/programacion',
  requireAdmin,
  validateBody(cursoProgramacionSchema),
  CursosController.createProgramacion)

router.post('/matematicas',
  requireAdmin,
  validateBody(cursoMatematicasSchema),
  CursosController.createMatematicas)

router.post('/bases_de_datos',
  requireAdmin,
  validateBody(cursoBDSchema),
  CursosController.createBD)

// PUT
router.put(
  '/programacion/:id',
  requireAdmin,
  validateParams(idParamSchema),
  validateBody(cursoProgramacionSchema),
  CursosController.updateProgramacion
)

router.put(
  '/matematicas/:id',
  requireAdmin,
  validateParams(idParamSchema),
  validateBody(cursoMatematicasSchema),
  CursosController.updateMatematicas
)

router.put(
  '/bases_de_datos/:id',
  requireAdmin,
  validateParams(idParamSchema),
  validateBody(cursoBDSchema),
  CursosController.updateBD
)

// PATCH
router.patch(
  '/programacion/:id',
  requireAdmin,
  validateParams(idParamSchema),
  validateBody(cursoProgramacionPatchSchema),
  CursosController.patchProgramacion
)

router.patch(
  '/matematicas/:id',
  requireAdmin,
  validateParams(idParamSchema),
  validateBody(cursoMatematicasPatchSchema),
  CursosController.patchMatematicas
)

router.patch(
  '/bases_de_datos/:id',
  requireAdmin,
  validateParams(idParamSchema),
  validateBody(cursoBDPatchSchema),
  CursosController.patchBD
)

// DELETE
router.delete('/programacion/:id',
  requireAdmin,
  validateParams(idParamSchema),
  CursosController.deleteProgramacion
)

router.delete('/matematicas/:id',
  requireAdmin,
  validateParams(idParamSchema),
  CursosController.deleteMatematicas
)

router.delete('/bases_de_datos/:id',
  requireAdmin,
  validateParams(idParamSchema),
  CursosController.deleteBD
)

export default router
