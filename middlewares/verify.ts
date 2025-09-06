//verify the access token
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {PrismaClient} from '@prisma/client';

dotenv.config();
const prisma = new PrismaClient();

const verify = async (req, res, next)=>{
    try{
        const cookie = req.headers["cookie"];
        const token = cookie.split("=")[1]; //get actual access token from req.header
        jwt.verify(token, process.env.TOKEN_SECRET, async function(err, decoded){
            if(err){
                console.log(err);
                res.status(401).json({"success":false, "error":"Invalid token"});
            }
            const {id} = decoded;
            req.user = await prisma.user.findUnique({
                where:{
                    id:id
                }
            });
            next();
        });
    }   
    catch (err){
        console.log(err);
        res.status(500).json({"success":false, "error":"server error!"});
    }
}

export default verify;