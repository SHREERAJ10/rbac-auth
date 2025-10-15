import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const resetPassword = async (req, res, next)=>{
    try{
        const newRawPassword = req.validatedData;
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(newRawPassword.password, salt);
    
        await prisma.user.update({
            where:{
                id:req.id
            },
            data:{
                password:passwordHash
            }
        });
    
        next();
    }
    catch (err){
        console.log(err);
        res.status(500).json({'success':false,'error':'internal server error!'});
    }
}

export default resetPassword;