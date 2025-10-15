import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const invalidateResetToken = async (req, res)=>{
    await prisma.passwordReset.delete({
        where:{
            userId:req.id
        }
    });
    res.status(200).json({'success':true,'message':'password has been reset successfully!'});
}

export default invalidateResetToken;