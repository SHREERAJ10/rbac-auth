import express from 'express';
import dotenv from 'dotenv';
import {verifyAccessToken, verifyRole} from '../../middlewares/verify';
const router = express.Router();

dotenv.config();

const adminRoute = router.get('/', verifyAccessToken(process.env.TOKEN_SECRET), verifyRole, (req, res)=>{
    res.status(200).json({"success":true,"message":"welcome, admin!"});
});

export default adminRoute;