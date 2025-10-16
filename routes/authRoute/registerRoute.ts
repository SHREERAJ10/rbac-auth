import express from 'express';
import register from '../../controllers/Auth/register'
import validateSchema from '../../middlewares/validateSchema'
import {registrationSchema} from '../../zodSchemas/schema'

const router = express.Router();

const registerRoute = router.post('/',validateSchema(registrationSchema), register);

export default registerRoute;