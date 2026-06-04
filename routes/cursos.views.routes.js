import { Router } from 'express'
import { CursosViewsController } from '../controllers/cursos.views.controller.js'

const router = Router()

router.get('/', CursosViewsController.index)
router.get('/cursos-view', CursosViewsController.cursos)
router.get('/cursos-view/programacion', CursosViewsController.programacion)
router.get('/cursos-view/matematicas', CursosViewsController.matematicas)
router.get('/cursos-view/bases_de_datos', CursosViewsController.basesDeDatos)

export default router