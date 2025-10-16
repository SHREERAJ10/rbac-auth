import express from 'express'
import {verifyRefreshToken, verifyRefreshTokenInDB} from '../../middlewares/verify'
import dotenv from 'dotenv'
import issueTokens, { updateRefreshTokenInDB } from '../../utils/auth/issueTokens'

dotenv.config();

const router = express.Router();

const refreshRoute = router.post('/', verifyRefreshToken(process.env.REFRESH_TOKEN_SECRET), verifyRefreshTokenInDB, issueTokens, updateRefreshTokenInDB);

export default refreshRoute;