import { NextFunction, Request, Response, Router } from "express"
import jwt from 'jsonwebtoken'
import basicAuthenticationMiddleware from "../middlewares/basicAuthentication.middleware"
import jwtAuthenticationMiddleware from "../middlewares/jwtAuthentication.middleware"
import ForbiddenError from "../models/errors/forbidden.error.model"

const authRoute = Router()

authRoute.post('/token', basicAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user
    if (!user) throw new ForbiddenError("Usuário inválido")

    const jwtPayload = { username: user.username }
    const jwtOptions = { subject: user?.uuid }
    const secretKey = process.env.JWT_SECRET_KEY as string

    const jwtSigned = jwt.sign(jwtPayload, secretKey , jwtOptions)
    
    res.status(200).json({ token: jwtSigned })
  
  } catch (error) {
    next(error)
  }
})

authRoute.post('/token/validate', jwtAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(200)
})

export default authRoute