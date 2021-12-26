import express from 'express'
import type { Response, Request } from 'express'
import { getBoards, getUsers } from '../../utils/db'
import type { fetchBody } from '../../app/types/types'

const auth = express.Router()

export default auth

auth.get('/', async (req: Request, res: Response) => {
  const isLoggedIn = req.session?.user

  if (isLoggedIn) {
    res.send('ok')
  } else {
    res.status(401).send('Not Logged In.')
  }
})

auth.post('/checkBoardAccess', async (req: Request, res: Response) => {
  const { boardName: name } = req.body
  const user = req.session?.user

  if (!user) {
    res.status(401).send('Access Denied')
    return
  }

  const board = await getBoards().findOne({ name })

  if (!board) {
    res.status(404).send('Error: Bad request.')
    return
  }

  const hasAccessRights = board.users.includes(user)

  if (hasAccessRights) {
    res.send('Ok')
  } else {
    res.status(401).send('Access Denied!')
  }
})

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
  res.send('ok')
})

auth.post('/logout', async (req: Request, res: Response) => {
  req.session = null
  res.send('ok')
})
