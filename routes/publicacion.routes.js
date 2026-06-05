import { Router } from 'express'
import { PublicacionController } from '../controllers/publicacion.controller.js'
import { validateBody } from '../middlewares/validate.js'
import { createPublicacionSchema, idParamSchema } from '../schemas/publicacion.schema.js'
import { validateParams } from '../middlewares/validate.js'
import { requireAuth } from '../middlewares/auth.middleware.js'
import { upload } from '../middlewares/upload.js'

const router = Router()

router.get('/', requireAuth, PublicacionController.feed)

router.post('/',
  requireAuth,
  upload.single('imagen'),
  validateBody(createPublicacionSchema),
  PublicacionController.create
)

router.delete('/:id',
  requireAuth,
  validateParams(idParamSchema),
  PublicacionController.delete
)

export default router
