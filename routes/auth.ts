import express from "express";
import { PrismaClient } from "@prisma/client";
import { z, ZodError } from "zod";
import bcrypt from "bcrypt";

//test pwd for l.lawliet@gmail.com: sweettooth123

const schema = z.object({
    email: z.email().trim(),
    password: z.string().min(8).trim(),
});

const prisma = new PrismaClient();
const router = express.Router();

const authRoute = router.post("/", async (req, res) => {
    try {
        const data = await schema.parseAsync(req.body);
        const userData = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });
        if(userData!=null){
            //authentication logic
            const registeredUser = await bcrypt.compare(
                data.password,
                userData.password
            );
    
            if (registeredUser) {
                res.status(200).json({ success: true, message: "login successful" });
            } else {
                res.status(400).json({ success: false, error: "wrong password" });
            }
        }
        else{
            res.status(404).json({'success':false,'error':'email is not registered!'})
        }

    }
    catch (err) {
        if (err instanceof ZodError) {
            console.log(err);
            res.status(400).json({ success: false, error: "invalid input!" });
        } 
        else {
            console.log(err);
            res.status(500).json({ success: false, error: "server error!" });
        }
    }
});

export default authRoute;
