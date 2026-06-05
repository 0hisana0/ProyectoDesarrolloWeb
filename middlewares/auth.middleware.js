export const requireAuth = (req, res, next) => {
  if (!req.session.usuario) {
    return res.redirect('/login')
  }
  next()
}

export const requireAdmin = (req, res, next) => {
  if (!req.session.usuario) {
    return res.redirect('/login')
  }

  if (req.session.usuario.id && req.session.usuario.rol !== 'admin') {
    return res.status(403).json({
      error: 'No tienes permisos para realizar esta acción'
    })
  }

  next()
}

export const setLocals = (req, res, next) => {
  res.locals.usuarioActual = req.session.usuario ?? null
  next()
}

export const noCache = (req, res, next) => {
  res.set({
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
    'Surrogate-Control': 'no-store'
  })
  next()
}
