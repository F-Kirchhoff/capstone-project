import express from 'express'
import type { Response, Request } from 'express'

const boards = express.Router()

boards.get('/', (_req: Request, res: Response) => {
  res.send('GET boards')
})

export default boards
