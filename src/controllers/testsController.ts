import { Request, Response } from "express";
import { send } from "process";
import * as testsServices from "../services/testsServices.js"


export async function create(req: Request, res: Response) {
    const { name, url, category, teacher, discipline, term } = req.body

    const teacherDisciplineId = await testsServices.teacherDiscipline(teacher, discipline, term)
    
    const categoryId = await testsServices.category(category)

    await testsServices.createTest(name, url, categoryId, teacherDisciplineId)

    return res.sendStatus(201)
}