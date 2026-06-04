// Uso: node scripts/crear-admin.js
// Genera el INSERT listo para pegar en el SQL

import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

const datos = {
  nombre: 'Administrador',
  email: 'admin@cursosdb.com',
  password: 'admin123456',   // ← cambiar antes de ejecutar
  rol: 'admin'
}

const hash = await bcrypt.hash(datos.password, SALT_ROUNDS)

console.log('\n✅ Hash generado correctamente\n')
console.log('──────────────────────────────────────────────────────')
console.log(`Contraseña original : ${datos.password}`)
console.log(`Hash bcrypt         : ${hash}`)
console.log('──────────────────────────────────────────────────────')
console.log('\n📋 INSERT listo para copiar:\n')
console.log(`INSERT INTO usuarios (nombre, email, password, rol) VALUES (`)
console.log(`  '${datos.nombre}',`)
console.log(`  '${datos.email}',`)
console.log(`  '${hash}',`)
console.log(`  '${datos.rol}'`)
console.log(`);\n`)