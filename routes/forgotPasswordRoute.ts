import express from 'express';
import getUserIdFromEmail from '../utils/ForgotPassword/getUserIdFromEmail';
import genAndStoreToken from '../utils/ForgotPassword/genAndStoreToken';
import sendResetLink from '../utils/ForgotPassword/sendResetLink';
import validatePasswordResetToken from '../middlewares/validatePasswordResetToken';
import resetPassword from '../controllers/ForgotPassword/resetPassword';
import validateSchema from '../middlewares/validateSchema';
import { emailSchema, passwordSchema } from '../zodSchemas/schema';
import invalidateResetToken from '../utils/ForgotPassword/invalidateResetToken';

const forgotPasswordRoute = express.Router();

forgotPasswordRoute.post('/', validateSchema(emailSchema), getUserIdFromEmail, genAndStoreToken, sendResetLink);

forgotPasswordRoute.post('/token', validateSchema(passwordSchema), validatePasswordResetToken, resetPassword, invalidateResetToken);

export default forgotPasswordRoute;