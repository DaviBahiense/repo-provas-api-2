import * as authRepository from "../repositories/authRepository.js"
import { Users } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export type UserData = Omit<Users, "id">;

export async function register(user:UserData) {

    const findEmail = await authRepository.find(user)
    console.log(findEmail)
    if (findEmail) {throw {type:"conflict", message:"E-mail já cadastrado"}};

    const hashPass = bcrypt.hashSync(user.password, 10);    
    const userData = { email : user.email, password : hashPass}

   await authRepository.register(userData)
} 

export async function login(user:UserData) {
    
    const findUser = await authRepository.find(user)
    if (!findUser) {throw {type:"not_found", message:"E-mail não encontrado"}};

    const data = { email: user.email };
    const secret = process.env.JWT_SECRET;
    const config = { expiresIn: 60*60*3 }

    const token = jwt.sign(data, secret, config);

    return token
}