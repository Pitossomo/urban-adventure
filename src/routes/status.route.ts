import { NextFunction, Request, Response, Router } from "express"

const statusRoute = Router()

statusRoute.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ foo: 'bar' })
})

export default statusRoute