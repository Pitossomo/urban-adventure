import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ForbiddenError from "../models/errors/forbidden.error.model";

function jwtAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.get('authorization')
    if (!authHeader) throw new ForbiddenError('Credenciais não informadas')
  
    const [authType, token] = authHeader.split(' ')
    if (authType.toLowerCase() !== 'bearer' || !token) throw new ForbiddenError('Autenticação inválida')
  
    const tokenPayload = jwt.verify(token, process.env.JWT_SECRET_KEY as string)
    
    if (typeof tokenPayload !== 'object' || !tokenPayload.sub) throw new ForbiddenError('Token inválido')
    req.user = {
      uuid: tokenPayload.sub,
      username: tokenPayload.username
    }
    
    next()
  } catch (error) {
    next(error)
  }
}

export default jwtAuthenticationMiddleware