import {Router} from 'express'
import * as testsController from "../controllers/testsController.js"

const testsRouter = Router();

testsRouter.post('/newtest', testsController.create)

export default testsRouter
