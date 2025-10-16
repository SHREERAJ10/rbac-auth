import crypto from 'crypto';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const genAndStoreVerificationToken = async (req, res, next)=>{

    try{
        const tokenExpiresInHours = 3;
    
        //generate token
        const verificationToken = crypto.randomBytes(64).toString('hex');
        
        //hash the token
        const tokenHash = crypto.createHash('sha256').update(verificationToken).digest('hex');
    
        const userId = req.id;
        const user = await prisma.emailVerification.findFirst({
            where:{
                userId:userId
            }
        })
    
        if(user==null){
            await prisma.emailVerification.create({
                data:{
                    userId: userId,
                    verification_token_hash: tokenHash,
                    token_created_at: new Date(),
                    token_expires_at: new Date(Date.now() + tokenExpiresInHours * 60 *60 * 1000), //expiry time in ms
                }
            });
        }
        else{
            await prisma.emailVerification.update({
                data:{
                    verification_token_hash:tokenHash,
                    token_created_at: new Date(),
                    token_expires_at: new Date(Date.now() + tokenExpiresInHours * 60 * 60 * 1000),
                },
                where:{
                    userId:userId
                }
            });
        }
        req.verificationToken = verificationToken;
        next();
    }
    catch (err){
        console.log(err);
        res.status(500).json({'success':false,'error':'unexpected server error!'});
    }

}

export default genAndStoreVerificationToken;