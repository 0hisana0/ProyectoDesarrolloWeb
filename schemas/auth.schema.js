import { z } from 'zod'

export const registerSchema = z.object({
  nombre: z.string({
    error: (issue) => issue.input === undefined
      ? 'El nombre es obligatorio'
      : 'El nombre debe ser un texto'
  }).min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),

  email: z.string({
    error: (issue) => issue.input === undefined
      ? 'El email es obligatorio'
      : 'El email debe ser un texto'
  }).email({ message: 'El email no es válido' }),

  password: z.string({
    error: (issue) => issue.input === undefined
      ? 'La contraseña es obligatoria'
      : 'La contraseña debe ser un texto'
  }).min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
})

export const loginSchema = z.object({
  email: z.string({
    error: (issue) => issue.input === undefined
      ? 'El email es obligatorio'
      : 'El email debe ser un texto'
  }).email({ message: 'El email no es válido' }),

  password: z.string({
    error: (issue) => issue.input === undefined
      ? 'La contraseña es obligatoria'
      : 'La contraseña debe ser un texto'
  }).min(1, { message: 'La contraseña es obligatoria' })
})