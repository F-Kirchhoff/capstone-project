import express from 'express'
import type { Response, Request } from 'express'
import { getBoards } from '../../utils/db'

const auth = express.Router()

auth.get('/', (req: Request, res: Response) => {
  const session = req.session
  console.log(session)

  if (session.userid) {
    res.send(true)
  } else res.send(false)
})

export default auth
