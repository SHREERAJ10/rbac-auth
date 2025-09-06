import express from 'express';
import {verifyToken, verifyRole} from '../middlewares/verify';
const router = express.Router();


const adminRoute = router.get('/', verifyToken, verifyRole, (req, res)=>{
    res.status(200).json({"success":true,"message":"welcome, admin!"});
});

export default adminRoute;