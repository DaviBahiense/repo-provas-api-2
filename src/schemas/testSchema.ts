import Joi from "joi";
import { CreateTest } from "../services/testService.js"

export const testSchema = Joi.object<CreateTest>({
  name: Joi.string().required(),
  pdfUrl: Joi.string().required(),
  categoryId: Joi.number().required(),
  teacherDisciplineId: Joi.number().required()
});