// Uso: node scripts/verificar-password.js

import bcrypt from 'bcrypt'

const passwordPlano = 'admin123456'      // ← contraseña a verificar
const hashGuardado = '$2b$10$htg4AMRkRrM1xf//qJ9Ks.MRJwXJpaaCRoKCBvwCugM.vJrkE0ehW'

const coincide = await bcrypt.compare(passwordPlano, hashGuardado)

console.log('\n──────────────────────────────────────────────────────')
console.log(`Contraseña   : ${passwordPlano}`)
console.log(`Hash         : ${hashGuardado}`)
console.log(`¿Coincide?   : ${coincide ? '✅ SÍ' : '❌ NO'}`)
console.log('──────────────────────────────────────────────────────\n')