import express from 'express';
import register from '../controllers/register'
import validate from '../middlewares/validate'
import {registrationSchema} from '../zodSchemas/schema'

const router = express.Router();

const registerRoute = router.post('/',validate(registrationSchema), register);

export default registerRoute;