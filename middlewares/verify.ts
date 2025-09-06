import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {PrismaClient} from '@prisma/client';

dotenv.config();
const prisma = new PrismaClient();

export const verifyToken = async (req, res, next)=>{
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
                select:{
                    id:true,
                    role:true
                },
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

export const verifyRole = async (req, res, next)=>{
    try{
        const role = req.user.role;
        if(role==="admin"){
            next();
        }
        else{
            res.status(403).json({"success":false,"error":"access denied!"});
        }
    }
    catch (err){
        console.log(err);
        res.status(500).json({"success":false,"error":"server error!"});
    }
}