// Protege rutas que requieren sesión activa
export const requireAuth = (req, res, next) => {
  if (!req.session.usuario) {
    return res.redirect('/login')
  }
  next()
}

// Protege rutas exclusivas para administradores
export const requireAdmin = (req, res, next) => {
  if (!req.session.usuario) {
    return res.redirect('/login')
  }

  if (req.session.usuario.rol !== 'admin') {
    return res.status(403).json({
      error: 'No tienes permisos para realizar esta acción'
    })
  }

  next()
}

// Expone el usuario en todas las vistas EJS automáticamente
export const setLocals = (req, res, next) => {
  res.locals.usuarioActual = req.session.usuario ?? null
  next()
}

// Desactiva caché en rutas protegidas
export const noCache = (req, res, next) => {
  res.set({
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
    'Surrogate-Control': 'no-store'
  })
  next()
}