import { z } from 'zod'

export const cursoMatematicasSchema = z.object({
  titulo: z.string({
    error: (issue) => issue.input === undefined
      ? 'El titulo es obligatorio'
      : 'El titulo debe ser un texto'
  }).min(5, { message: 'El titulo debe tener al menos 5 caracteres' }),

  tema: z.string({
    error: (issue) => issue.input === undefined
      ? 'El tema es obligatorio'
      : 'El tema debe ser un texto'
  }).min(3, { message: 'El tema debe tener al menos 3 caracteres' }),

  vistas: z.number({
    error: (issue) => issue.input === undefined
      ? 'El campo vistas es obligatorio'
      : 'El campo vistas debe ser un número'
  }).int({ error: 'El campo vistas debe ser entero' })
    .nonnegative({ message: 'El campo vistas no puede ser negativo' }),

  nivel: z.enum(['basico', 'intermedio', 'avanzado'], {
    error: (issue) => issue.input === undefined
      ? 'El nivel es obligatorio'
      : 'El nivel debe ser: básico, intermedio, avanzado'
  })
})

export const cursoMatematicasPatchSchema = cursoMatematicasSchema.partial()

export const cursoProgramacionSchema = z.object({
  titulo: z.string({
    error: (issue) => issue.input === undefined
      ? 'El titulo es obligatorio'
      : 'El titulo debe ser un texto'
  }).min(5, { message: 'El titulo debe tener al menos 5 caracteres' }),

  lenguaje: z.string({
    error: (issue) => issue.input === undefined
      ? 'El lenguaje es obligatorio'
      : 'El lenguaje debe ser un texto'
  }).min(3, { message: 'El titulo debe tener al menos 3 caracteres' }),

  vistas: z.number({
    error: (issue) => issue.input === undefined
      ? 'El campo vistas es obligatorio'
      : 'El campo vistas debe ser un número'
  }).int({ message: 'El campo vistas debe ser entero' })
    .nonnegative({ message: 'El campo vistas no puede ser negativo' }),

  nivel: z.enum(['basico', 'intermedio', 'avanzado'], {
    error: (issue) => issue.input === undefined
      ? 'El nivel es obligatorio'
      : 'El nivel debe ser: básico, intermedio, avanzado'
  })
})

export const cursoProgramacionPatchSchema = cursoProgramacionSchema.partial()

export const cursoBDSchema = z.object({
  titulo: z.string({
    error: (issue) => issue.input === undefined
      ? 'El titulo es obligatorio'
      : 'El titulo debe ser un texto'
  }).min(5, { message: 'El titulo debe tener al menos 5 caracteres' }),

  tecnologia: z.string({
    error: (issue) => issue.input === undefined
      ? 'El campo tecnologia es obligatorio'
      : 'El campo tecnologia debe ser un texto'
  }).min(3, { message: 'El campo tecnologia debe tener al menos 3 caracteres' }),

  vistas: z.number({
    error: (issue) => issue.input === undefined
      ? 'El campo vistas es obligatorio'
      : 'El campo vistas debe ser un número'
  }).int({ message: 'El campo vistas debe ser entero' })
    .nonnegative({ message: 'El campo vistas no puede ser negativo' }),

  nivel: z.enum(['basico', 'intermedio', 'avanzado'], {
    error: (issue) => issue.input === undefined
      ? 'El nivel es obligatorio'
      : 'El nivel debe ser: básico, intermedio, avanzado'
  })
})

export const cursoBDPatchSchema = cursoBDSchema.partial()

// Params (ej: /:id)
export const idParamSchema = z.object({
  id: z.coerce.number({
    error: (issue) => issue.input === undefined
      ? 'El ID es obligatorio'
      : 'El ID debe ser un numero'
  }) // convierte string → number automáticamente
})