import express from 'express'
import router from './db/routes/index.js'

const api = express()
api.use(express.json())
api.use('/', router)

export default api;
