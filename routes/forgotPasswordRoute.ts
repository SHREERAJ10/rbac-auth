import express from 'express';
import getUserIdFromEmail from '../controllers/PasswordReset/getUserIdFromEmail';
import genAndStoreToken from '../controllers/PasswordReset/genAndStoreToken';
import sendResetLink from '../controllers/PasswordReset/sendResetLink';
import validateToken from '../controllers/PasswordReset/validateToken';
import resetPassword from '../controllers/PasswordReset/resetPassword';
import validateSchema from '../middlewares/validateSchema';
import { emailSchema, passwordSchema } from '../zodSchemas/schema';
import invalidateResetToken from '../controllers/PasswordReset/invalidateResetToken';

const forgotPasswordRoute = express.Router();

forgotPasswordRoute.post('/', validateSchema(emailSchema), getUserIdFromEmail, genAndStoreToken, sendResetLink);

forgotPasswordRoute.post('/token', validateSchema(passwordSchema), validateToken, resetPassword, invalidateResetToken);

export default forgotPasswordRoute;