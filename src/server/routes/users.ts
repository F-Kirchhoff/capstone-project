import express from 'express'
import type { Response, Request } from 'express'
import type { fetchBody } from '../../app/types/types'
import { getUsers } from '../../utils/db'

const boards = express.Router()

boards.get('/', async (req: Request, res: Response) => {
  const { username }: fetchBody = req.query

  const users = await getUsers()
  const user = await users.findOne({ 'public.username': username })

  if (!user) {
    res.status(404).send(`Error: no user called ${username} found.`)
    return
  }

  res.send(user.public)
})

export default boards
