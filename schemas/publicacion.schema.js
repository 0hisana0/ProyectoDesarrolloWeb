import { z } from 'zod'

export const createPublicacionSchema = z.object({
  contenido: z.string({
    error: (issue) => issue.input === undefined
      ? 'El contenido es obligatorio'
      : 'El contenido debe ser un texto'
  }).min(1, { message: 'La publicación no puede estar vacía' })
    .max(5000, { message: 'La publicación no puede exceder 5000 caracteres' }),

  imagen: z.string().optional().nullable()
})

export const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, { message: 'El ID debe ser un número' })
})
