import express from 'express'
import router from './db/routes/index.js'
import expressSanitizer from 'express-sanitizer'

const api = express()
api.use(express.json())
api.use(expressSanitizer())
api.use('/', router)

export default api
