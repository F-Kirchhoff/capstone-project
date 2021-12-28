import express from 'express'
import { checkBoardAccess } from '../middleware/checkBoardAccess'
import { checkLoginStatus } from '../middleware/checkLoginStatus'
import auth from './auth'
import boards from './boards'
import needs from './needs'
import proposals from './proposals'
import topics from './topics'
import users from './users'
import votes from './votes'

const api = express.Router()

api.use('/auth', auth)
api.use('/users', users)

api.use(checkLoginStatus)

api.use('/boards', boards)

api.use(checkBoardAccess)

api.use('/topics', topics)
api.use('/needs', needs)
api.use('/proposals', proposals)
api.use('/votes', votes)

export default api
