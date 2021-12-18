import express from 'express'
import type { Response, Request } from 'express'
import { getUsers } from '../../utils/db'
import type { fetchBody } from '../../app/types/types'

const auth = express.Router()

auth.get('/', (req: Request, res: Response) => {
  const session = req.session
  console.log(session)

  if (session.userid) {
    res.send(true)
  } else res.send(false)
})

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
  res.send({ username: user.public.username })
})
