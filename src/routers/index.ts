import { Router } from "express";
import seekRouter from "./seekRouter.js";
import testRouter from "./testRouter.js";
import userRouter from "./userRouter.js";

const router = Router();
router.use(userRouter);
router.use(testRouter);
router.use(seekRouter);
export default router;
