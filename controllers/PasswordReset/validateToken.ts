import {PrismaClient} from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

const validateToken = async (req, res, next)=>{

    try{
        const selector = req.query.selector as string;
        const rawResetToken = req.query.token as string;
        const resetTokenHash = crypto.createHash('sha256').update(rawResetToken).digest('hex');
        
        const userData = await prisma.passwordReset.findFirst({
            where:{
                selector:selector
            }
        });
    
        const {userId, reset_token_hash, token_expires_at, token_used_at} = userData;
    
        if(token_used_at == null && resetTokenHash == reset_token_hash && Date.now()<token_expires_at.getTime()){
                await prisma.passwordReset.update({
                    where:{
                        userId:userId
                    },
                    data:{
                        token_used_at:new Date()
                    }
                });
                req.id = userId;
                next();
            }
            else if(resetTokenHash != reset_token_hash){
                res.status(400).json({'success':false,'error':'reset token is incorrect!'});
            }
            else if(token_used_at != null){
                res.status(400).json({'success':false,'error':'token already used'});
            }
            else if(Date.now() > token_expires_at.getTime()){
                res.status(400).json({'success':false,'error':'token has expired'});
            }
            else{
                res.status(500).json({'success':false,'error':'unexpected error!'});
            }
    }
    catch (err){
        console.log(err);
        res.status(500).json({'success':false,'error':'internal server error!'});
    }
}

export default validateToken;