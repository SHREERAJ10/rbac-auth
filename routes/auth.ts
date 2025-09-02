import express from 'express';
import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();
const router = express.Router();

const authRoute = router.post('/', async (req, res)=>{
    const data = req.body;
    const userData = await prisma.user.findUnique({
        where:{
            email:data.email
        }
    });

    //authentication logic
    const registeredUser = await bcrypt.compare(data.password, userData.password);

    if(registeredUser){
        res.status(200).json({'success':true,'message':'login successful'});
    }
    else{
        res.status(400).json({'success':false,'error':'wrong password'});
    }

});

export default authRoute;