import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller.js'
import { validateBody } from '../middlewares/validate.js'
import { loginSchema, registerSchema } from '../schemas/auth.schema.js'

const router = Router()

router.get('/login', AuthController.loginView)
router.get('/register', AuthController.registerView)

router.post('/login',
  validateBody(loginSchema),
  AuthController.login
)

router.post('/register',
  validateBody(registerSchema),
  AuthController.register
)

router.post('/logout', AuthController.logout)

// GET /api/check-session
router.get('/api/check-session', (req, res) => {
  if (req.session.usuario) {
    return res.json({ ok: true })
  }
  res.status(401).json({ ok: false })
})

export default router