import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";

export async function validateTokenMiddleware(req: Request, res: Response, next:NextFunction) {
  const token = req.headers.token as string;
  const secret = process.env.JWT_SECRET;

  try {
    const dados = jwt.verify(token, secret);
  } catch {
    throw  {type:"expired", message:"Token expirado"};   
  }
  
  next();
}