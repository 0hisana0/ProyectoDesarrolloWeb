const tipo = process.env.DB ?? 'local'

const { CursosModel } = tipo === 'mysql'
  ? await import('./mysql/cursos.model.js')
  : await import('./local-file-system/cursos.model.js')

console.log(tipo)

export { CursosModel }