import express from 'express';
import { verifyAccessToken } from '../middlewares/verify';
import dotenv from 'dotenv';
import emailVerificationStuff from '../controllers/emailVerificationStuff';
import sendEmail from '../controllers/sendEmail';
import verifyEmailToken from '../controllers/verifyEmailToken';
import checkEmailAlreadyVerified from '../controllers/checkEmailAlreadyVerified';

dotenv.config();

const router = express.Router();

const emailRoute = router.post('/', verifyAccessToken(process.env.TOKEN_SECRET), checkEmailAlreadyVerified, emailVerificationStuff, sendEmail);

router.get('/token', verifyAccessToken(process.env.TOKEN_SECRET), verifyEmailToken);


export default emailRoute;