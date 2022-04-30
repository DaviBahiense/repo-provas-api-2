import { Request, Response } from "express";
import seekService from "../services/seekService.js";

async function category(req: Request, res: Response) {
  const categories = await seekService.category();
  res.send({ categories });
}

async function teacher(req: Request, res: Response) {
  const teacher = await seekService.teacher();
  res.send( teacher );
}

async function discipline(req: Request, res: Response) {
  const discipline = await seekService.discipline();
  res.send( discipline );
}

async function teacherDiscipline(req: Request, res: Response) {
  const { teacherId, disciplineId } = req.body

  const teacherDisciplineId = await seekService.teacherDiscipline(teacherId, disciplineId);

  return res.send(teacherDisciplineId)
}

export default {
  category,
  teacherDiscipline,
  teacher,
  discipline
};
