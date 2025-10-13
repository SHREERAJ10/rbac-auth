import express from 'express';
import getUserIdFromEmail from '../controllers/PasswordReset/getUserIdFromEmail';
import genAndStoreToken from '../controllers/PasswordReset/genAndStoreToken';
import sendResetLink from '../controllers/PasswordReset/sendResetLink';
import validateToken from '../controllers/PasswordReset/validateToken';
import resetPassword from '../controllers/PasswordReset/resetPassword';
import validateSchema from '../middlewares/validateSchema';
import { emailSchema } from '../zodSchemas/schema';

const passwordResetRoute = express.Router();

passwordResetRoute.post('/', validateSchema(emailSchema), getUserIdFromEmail, genAndStoreToken, sendResetLink);

passwordResetRoute.post('/token', validateToken, resetPassword);

export default passwordResetRoute;