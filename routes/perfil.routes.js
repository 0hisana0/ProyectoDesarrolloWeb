import { Router } from 'express'
import { PerfilController } from '../controllers/perfil.controller.js'
import { PublicacionController } from '../controllers/publicacion.controller.js'
import { requireAuth } from '../middlewares/auth.middleware.js'
import { upload } from '../middlewares/upload.js'

const router = Router()

router.get('/', requireAuth, PerfilController.editView)

router.put('/',
  requireAuth,
  upload.single('foto_perfil'),
  PerfilController.update
)

router.get('/mi-perfil', requireAuth, PublicacionController.perfil)

router.get('/:id', requireAuth, PublicacionController.verPerfil)

export default router
