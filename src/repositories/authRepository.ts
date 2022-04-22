import { prisma } from "../database.js";
import { UserData } from "../services/authServices.js";

export async function register(user: UserData) {
    return prisma.users.create({
        data: user
    })
}

export async function find(userData: UserData) {
    return prisma.users.findFirst({
        where:{
            email: userData.email
        }
    })
}