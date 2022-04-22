import { Request, Response } from "express";
import * as authServices from "../services/authServices.js"
import { UserData } from "../services/authServices.js";


export async function register(req: Request, res: Response) {
    const user: UserData = req.body

    await authServices.register(user)
   
    return res.sendStatus(201)
}

export async function login(req: Request, res: Response) {
    const user: UserData = req.body

    const token = await authServices.login(user)
   
    return res.send(token).status(200)
}
