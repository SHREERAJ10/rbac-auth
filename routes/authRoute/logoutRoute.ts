import express from 'express';
import { verifyRefreshToken } from '../../middlewares/verify';
import dotenv from 'dotenv';
import logout from '../../controllers/Auth/logout';
import { resetTokens } from '../../utils/auth/issueTokens';

dotenv.config();

const router = express.Router();

const logoutRoute = router.post('/', verifyRefreshToken(process.env.REFRESH_TOKEN_SECRET), logout, resetTokens);

export default logoutRoute; 