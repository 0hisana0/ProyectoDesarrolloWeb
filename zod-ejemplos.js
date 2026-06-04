import { z } from 'zod'

// 1. STRING
const stringSchema = z.string().min(3).max(10)

console.log('STRING:')
console.log(stringSchema.safeParse('Hola'))       // ✅ válido
console.log(stringSchema.safeParse('Hi'))         // ❌ muy corto

// 2. NUMBER
const numberSchema = z.number().int().positive()

console.log('\nNUMBER:')
console.log(numberSchema.safeParse(10))          // ✅ válido
console.log(numberSchema.safeParse(-5))          // ❌ negativo
console.log(numberSchema.safeParse(3.5))         // ❌ no entero

// 3. BOOLEAN
const booleanSchema = z.boolean()

console.log('\nBOOLEAN:')
console.log(booleanSchema.safeParse(true))       // ✅
console.log(booleanSchema.safeParse('true'))     // ❌

// 4. EMAIL
const emailSchema = z.string().email()

console.log('\nEMAIL:')
console.log(emailSchema.safeParse('test@mail.com')) // ✅
console.log(emailSchema.safeParse('correo-mal'))    // ❌

// 5. ARRAY
const arraySchema = z.array(z.number())

console.log('\nARRAY:')
console.log(arraySchema.safeParse([1, 2, 3]))     // ✅
console.log(arraySchema.safeParse([1, '2']))      // ❌

// 6. OBJECT
const userSchema = z.object({
  nombre: z.string(),
  edad: z.number().min(18),
  email: z.string().email()
})

console.log('\nOBJECT:')
console.log(userSchema.safeParse({
  nombre: 'Juan',
  edad: 25,
  email: 'juan@mail.com'
})) // ✅

console.log(userSchema.safeParse({
  nombre: 'Ana',
  edad: 15,
  email: 'malcorreo'
})) // ❌


// 7. ENUM
const nivelSchema = z.enum(['básico', 'intermedio', 'avanzado'])

console.log('\nENUM:')
console.log(nivelSchema.safeParse('básico'))     // ✅
console.log(nivelSchema.safeParse('experto'))    // ❌

// 8. OPTIONAL
const optionalSchema = z.object({
  nombre: z.string(),
  telefono: z.string().optional()
})

console.log('\nOPTIONAL:')
console.log(optionalSchema.safeParse({
  nombre: 'Carlos'
})) // ✅

// 9. NULLABLE
const nullableSchema = z.string().nullable()

console.log('\nNULLABLE:')
console.log(nullableSchema.safeParse(null))      // ✅
console.log(nullableSchema.safeParse('texto'))   // ✅

// 10. DEFAULT
const defaultSchema = z.object({
  nombre: z.string(),
  activo: z.boolean().default(true)
})

console.log('\nDEFAULT:')
console.log(defaultSchema.parse({
  nombre: 'Laura'
})) // agrega activo: true

// 11. TRANSFORM
const transformSchema = z.string().transform(val => val.toUpperCase())

console.log('\nTRANSFORM:')
console.log(transformSchema.parse('hola')) // "HOLA"

// 12. REFINEMENT (validación personalizada)
const passwordSchema = z.string().min(6).refine(val => {
  return /[A-Z]/.test(val)
}, {
  message: 'Debe contener al menos una mayúscula'
})

console.log('\nREFINE:')
console.log(passwordSchema.safeParse('abc123'))     // ❌
console.log(passwordSchema.safeParse('Abc123'))     // ✅

// 13. UNION
const unionSchema = z.union([z.string(), z.number()])

console.log('\nUNION:')
console.log(unionSchema.safeParse('hola'))   // ✅
console.log(unionSchema.safeParse(123))      // ✅
console.log(unionSchema.safeParse(true))     // ❌

// 14. FECHA
const dateSchema = z.date()

console.log('\nDATE:')
console.log(dateSchema.safeParse(new Date())) // ✅
console.log(dateSchema.safeParse('2024-01-01')) // ❌

// 15. URL
const urlSchema = z.string().url()

console.log('\nURL:')
console.log(urlSchema.safeParse('https://google.com')) // ✅
console.log(urlSchema.safeParse('no-es-url'))          // ❌