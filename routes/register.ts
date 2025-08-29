import express from 'express';
import {z} from 'zod';
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

});

export default registerRoute;