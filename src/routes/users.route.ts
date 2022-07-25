import { Router, Request, Response, NextFunction } from "express"

const usersRoute = Router()

usersRoute.get('/users', (req: Request, res: Response, next: NextFunction) => {
  const users: [] = []
  res.status(200).send(users)
})

export default usersRoute