import { Router } from 'express'
import { ReaccionController } from '../controllers/reaccion.controller.js'
import { validateParams } from '../middlewares/validate.js'
import { idParamSchema } from '../schemas/publicacion.schema.js'
import { requireAuth } from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/:id/toggle',
  requireAuth,
  validateParams(idParamSchema),
  ReaccionController.toggle
)

export default router
