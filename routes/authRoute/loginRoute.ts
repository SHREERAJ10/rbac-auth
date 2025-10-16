import express from "express";
import login from '../../controllers/Auth/login'
import validateSchema from '../../middlewares/validateSchema'
import {loginSchema} from '../../zodSchemas/schema'

const router = express.Router();

const loginRoute = router.post("/", validateSchema(loginSchema), login);

export default loginRoute;