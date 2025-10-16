import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const getUserIdFromEmail = async (req, res, next)=>{

    try{
        const email = req.validatedData.email;
    
        const id = (await prisma.user.findFirst({
            where:{
                email:email
            },
            select:{
                id:true
            }
        }));
    
        if(id!=null){
            req.id = id["id"];
            next();
        }
        else{
            //generic success message sent even if the email/user doesn't exist in the DB (for security)
            res.status(200).json({'success':true,'message':'reset link has been sent to the provided email.'});
        }
    }
    catch (err){
        console.log(err);
        res.status(500).json({'success':false,'error':'internal server error!'});
    }
}

export default getUserIdFromEmail;