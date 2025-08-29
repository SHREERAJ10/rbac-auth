import express from 'express';
import {z, ZodError} from 'zod';
import bcrypt from 'bcrypt';
import {PrismaClient} from '@prisma/client';

const user = z.object({
    name: z.string().min(3).max(20),
    email: z.email().trim(),
    password: z.string().min(8).trim()
});

const prisma = new PrismaClient();

const router = express.Router();

const registerRoute = router.post('/',async (req, res)=>{
    try{
        const data = req.body;
        const parsedData = await user.parseAsync(data);
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(parsedData.password, salt);
        const validData = {
            name:parsedData.name,
            email:parsedData.email,
            password:password
        };
    
        const result = await prisma.user.create({
            data:validData
        });
        res.status(201).json(result);
    }
    catch (err){
        if(err instanceof ZodError){
            res.status(400).json({"success":false,"error":"invalid input!"});
        }
        else if(err.code=="P2002" && err.meta.modelName == "User"){
            if(err.meta.target[0] == "name"){
                console.log(err);
                res.status(400).json({"success":false,"error":"name already taken. Try something else!"});
            }
            else if(err.meta.target[0] == "email"){
                console.log(err);
                res.status(400).json({"success":false,"error":"email already in use!"});
            }
        }
        else{
            console.log(err);
            res.status(500).json({"success":false,"error":"server error!"});
        }
    }
});

export default registerRoute;