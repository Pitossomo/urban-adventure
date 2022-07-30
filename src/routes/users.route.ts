import { NextFunction, Request, Response, Router } from "express"
import userRepository from "../repositories/user.repository"

const usersRoute = Router()

usersRoute.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const users = await userRepository.findAllUsers()
  res.status(200).send(users)
})

usersRoute.get('/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
  try {
    const uuid = req.params.uuid
    const user = await userRepository.findById(uuid)
    res.status(200).send(user)
  } catch (error) {
    next(error)
  }
})

usersRoute.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const username: string = req.body.username 
    const password: string = req.body.password 
    
    if (!username || username==='' || !password || password==='' ) return res.status(400)

    const newUser = { username, password }

    const newUserId = await userRepository.create(newUser)
    res.status(201).send(newUserId)
  } catch (error) {
    next(error)
  }
})

usersRoute.put('/:uuid', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const uuid = req.params.uuid
    const username: string = req.body.username 
    const password: string = req.body.password 

    if (!username || username==='' || !password || password==='' ) return res.status(400)

    await userRepository.update({uuid, username, password})
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

usersRoute.delete('/:uuid', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const uuid = req.params.uuid
    await userRepository.delete(uuid)
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

export default usersRoute