import express from 'express';
import { verifyAccessToken } from '../middlewares/verify';
import dotenv from 'dotenv';
import genAndStoreVerificationToken from '../utils/EmailVerification/genAndStoreVerificationToken';
import sendEmail from '../utils/EmailVerification/sendEmail';
import verifyEmailToken from '../controllers/EmailVerification/verifyEmailToken';
import checkEmailAlreadyVerified from '../middlewares/checkEmailAlreadyVerified';

dotenv.config();

const router = express.Router();

const emailRoute = router.post('/', verifyAccessToken(process.env.TOKEN_SECRET), checkEmailAlreadyVerified, genAndStoreVerificationToken, sendEmail);

router.get('/token', verifyAccessToken(process.env.TOKEN_SECRET), verifyEmailToken);


export default emailRoute;