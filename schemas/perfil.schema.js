import { z } from 'zod'

export const updatePerfilSchema = z.object({
  nombre: z.string({
    error: (issue) => issue.input === undefined
      ? 'El nombre es obligatorio'
      : 'El nombre debe ser un texto'
  }).min(2, { message: 'El nombre debe tener al menos 2 caracteres' }).optional(),

  biografia: z.string().max(500, { message: 'La biografía no puede exceder 500 caracteres' }).optional().nullable(),

  foto_perfil: z.string().optional().nullable()
})
