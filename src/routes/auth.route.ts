import { NextFunction, Request, Response, Router } from "express"
import jwt from 'jsonwebtoken'
import basicAuthenticationMiddleWare from "../middlewares/basicAuthentication.middleware"
import ForbiddenError from "../models/errors/forbidden.error.model"

const authRoute = Router()

authRoute.post('/token', basicAuthenticationMiddleWare, async (req: Request, res: Response, next: NextFunction) => {
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

export default authRoute