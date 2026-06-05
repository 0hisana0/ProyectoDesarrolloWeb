import { z } from 'zod'

export const createComentarioSchema = z.object({
  contenido: z.string({
    error: (issue) => issue.input === undefined
      ? 'El comentario es obligatorio'
      : 'El comentario debe ser un texto'
  }).min(1, { message: 'El comentario no puede estar vacío' })
    .max(2000, { message: 'El comentario no puede exceder 2000 caracteres' })
})
