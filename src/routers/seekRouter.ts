import { Router } from "express";
import seekController from "../controllers/seekController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticatedMiddleware.js";

const seekRouter = Router();

seekRouter.get(
  "/categories",
  ensureAuthenticatedMiddleware,
  seekController.category
);

seekRouter.get(
  "/teachers",
  ensureAuthenticatedMiddleware,
  seekController.teacher
);

seekRouter.get(
  "/disciplines",
  ensureAuthenticatedMiddleware,
  seekController.discipline
);

seekRouter.post(
  "/teacherDiscipline",
  ensureAuthenticatedMiddleware,
  seekController.teacherDiscipline
);

export default seekRouter;
