import express from 'express';
import register from '../controllers/register'
import validate from '../middlewares/validate'

const router = express.Router();

const registerRoute = router.post('/',validate, register);

export default registerRoute;