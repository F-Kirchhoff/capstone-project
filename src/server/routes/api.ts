import express from 'express'
import boards from './boards'

const api = express.Router()

api.use('/boards', boards)

export default api
