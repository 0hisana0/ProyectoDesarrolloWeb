import { Router } from 'express'
import { ComentarioController } from '../controllers/comentario.controller.js'
import { validateBody, validateParams } from '../middlewares/validate.js'
import { idParamSchema } from '../schemas/publicacion.schema.js'
import { createComentarioSchema } from '../schemas/comentario.schema.js'
import { requireAuth } from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/:id',
  requireAuth,
  validateParams(idParamSchema),
  validateBody(createComentarioSchema),
  ComentarioController.create
)

router.delete('/:id',
  requireAuth,
  validateParams(idParamSchema),
  ComentarioController.delete
)

export default router
