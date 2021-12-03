import express from 'express'
import boards from './boards'
import topics from './topics'

const api = express.Router()

api.use('/boards', boards)
api.use('/topics', topics)

export default api
