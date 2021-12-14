import express from 'express'
import boards from './boards'
import needs from './needs'
import proposals from './proposals'
import topics from './topics'
import votes from './votes'

const api = express.Router()

api.use('/boards', boards)
api.use('/topics', topics)
api.use('/needs', needs)
api.use('/proposals', proposals)
api.use('/votes', votes)

export default api
