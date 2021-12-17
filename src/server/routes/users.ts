import express from 'express'
import type { Response, Request } from 'express'
import type { fetchBody } from '../../app/types/types'
import { getUsers } from '../../utils/db'

const users = express.Router()

users.get('/', async (req: Request, res: Response) => {
  const { username }: fetchBody = req.query

  const users = await getUsers()
  const user = await users.findOne({ 'public.username': username })

  if (!user) {
    res.status(404).send(`Error: no user called ${username} found.`)
    return
  }

  res.send(user.public)
})

users.post('/', async (req: Request, res: Response) => {
  const {
    payload: { username, email, password },
  }: fetchBody = req.query

  const users = await getUsers()
  const user = await users.findOne({
    $or: [{ 'private.email': email }, { 'public.username': username }],
  })

  if (user) {
    res.status(422).send(`Error: email or username already in use.`)
    return
  }

  const newUser = {
    public: {
      username,
      boards: [],
    },
    private: {
      email,
      password,
    },
  }

  users.insertOne(newUser)

  res.send(`Success: User ${username} added`)
})

export default users
