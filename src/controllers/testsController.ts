import { Request, Response } from "express";
import * as testsServices from "../services/testsServices.js"


export async function create(req: Request, res: Response) {
    const { name, url, category, teacher, discipline, term } = req.body

    const teacherDisciplineId = await testsServices.teacherDiscipline(teacher, discipline, term)

    await testsServices.create(name, url, category)
}