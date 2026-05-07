import { boot } from 'quasar/wrappers'
import PouchDB from 'pouchdb'
import { DB_CONFIG } from 'src/config/variables'

export default boot(({ app }) => {
  const db = new PouchDB(DB_CONFIG.NAME)

  // opcional: log para verificar
  console.log('DB iniciada:', DB_CONFIG.NAME)

  // hacerlo global
  app.config.globalProperties.$db = db
})