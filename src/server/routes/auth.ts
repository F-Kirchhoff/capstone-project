import express from 'express'
import type { Response, Request } from 'express'
import { getUsers } from '../../utils/db'
import type { fetchBody } from '../../app/types/types'

const auth = express.Router()

export default auth

auth.post('/login', async (req: Request, res: Response) => {
  const {
    payload: { email, password },
  }: fetchBody = req.body

  const users = await getUsers()
  const user = await users.findOne({
    'private.email': email,
    'private.password': password,
  })

  if (!user) {
    res.status(401).send(`Error: wrong email or password.`)
    return
  }
  if (!req.session) {
    console.log('Error: No session set.')
    res.status(500).send()
    return
  }

  req.session.user = user.public.username
  res.send(req.session)
})

auth.post('/logout', async (req: Request, res: Response) => {
  req.session = null
  res.send()
})
