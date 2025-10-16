import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const invalidateResetToken = async (req, res)=>{
    try{
        await prisma.passwordReset.delete({
            where:{
                userId:req.id
            }
        });
        res.status(200).json({'success':true,'message':'password has been reset successfully!'});
    }
    catch (err){
        console.log(err);
        res.status(500).json({'success':false,'error':'internal server error!'});
    }
}

export default invalidateResetToken;