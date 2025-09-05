import express from "express";
import login from '../controllers/login'
import validate from '../middlewares/validate'
import {loginSchema} from '../zodSchemas/schema'
//test pwd for l.lawliet@gmail.com: sweettooth123

const router = express.Router();

const authRoute = router.post("/", validate(loginSchema), login);

export default authRoute;
