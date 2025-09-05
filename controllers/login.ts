import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

//test pwd for l.lawliet@gmail.com: sweettooth123

function generateAccessToken(id: Number): string{
    const payload = {
        "id":id
    }
    return jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: '1800s'} );
}

const prisma = new PrismaClient();

const login = async (req, res)=>{
    try {
            const data = await req.validatedData;
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
                    const options = {
                        maxAge: 20 * 60 * 1000, //expires in 20 minutes
                        httpOnly: true,
                        secure: true
                    }
                    const token = generateAccessToken(userData.id);
                    res.cookie("SessionID", token, options);
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
                console.log(err);
                res.status(500).json({ success: false, error: "server error!" });
        }
}

export default login;