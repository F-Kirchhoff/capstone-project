import express from 'express'
import type { Response, Request } from 'express'
import type { fetchBody } from '../../app/types/types'
import { getUsers } from '../../utils/db'
import validateString from '../../utils/validateString'

const users = express.Router()

users.get('/', async (req: Request, res: Response) => {
  if (!req.session || !req.session.user) {
    res.status(400).send('Error: Not logged in.')
    return
  }

  const username = req.session.user

  const users = await getUsers()
  const user = await users.findOne({ 'public.username': username })

  if (!user) {
    res.status(404).send('Error: Bad Request.')
    return
  }

  res.send(user.public)
})

users.post('/', async (req: Request, res: Response) => {
  const {
    payload: { username, email, password },
  }: fetchBody = req.body

  const validation = validateString(username)
  if (!validation.ok) {
    res.status(422).send(validation.msg)
    return
  }

  const users = await getUsers()
  const user = await users.findOne({
    $or: [{ 'private.email': email }, { 'public.username': username }],
  })

  if (user) {
    if (user.private.email === email) {
      res.status(422).send('Email already in use.')
    } else {
      res.status(422).send('Username already in use.')
    }
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

  res.send()
})

export default users
