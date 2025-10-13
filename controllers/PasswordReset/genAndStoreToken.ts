import {PrismaClient} from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

const genAndStoreToken = async (req, res, next)=>{

    try{

        const tokenExpiresInMins = 5;
    
        //generate token
        const resetToken = crypto.randomBytes(64).toString('hex');
        
        //hash the token
        const tokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
    
        const userId = req.id;
        const user = await prisma.passwordReset.findFirst({
            where:{
                userId:userId
            }
        })
    
        if(user==null){
            await prisma.passwordReset.create({
                data:{
                    userId: userId,
                    reset_token_hash: tokenHash,
                    token_created_at: new Date(),
                    token_expires_at: new Date(Date.now() + tokenExpiresInMins *60 * 1000), //expiry time in ms
                }
            });
        }
        else{
            await prisma.passwordReset.update({
                data:{
                    reset_token_hash:tokenHash,
                    token_created_at: new Date(),
                    token_expires_at: new Date(Date.now() + tokenExpiresInMins * 60 * 1000),
                },
                where:{
                    userId:userId
                }
            });
        }
        req.resetToken = resetToken;
        next();
    }
    catch (err){
        console.log(err);
        res.status(500).json({'success':false,'error':'unexpected server error!'});
    }
}

export default genAndStoreToken;