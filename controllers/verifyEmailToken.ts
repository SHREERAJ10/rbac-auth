import {PrismaClient} from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();


const verifyEmailToken =  async (req, res)=>{

    try{
        const rawToken = req.query.token as string;
        const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
        
        const userData = await prisma.emailVerification.findFirst({
            where:{
                userId: req.id
            },
            select:{
                email_verified:true,
                verification_token_hash:true,
                token_expires_at:true,
                token_used_at:true
            }
        });
    
        const {email_verified, verification_token_hash, token_expires_at, token_used_at} = userData;
    
        if(email_verified == false && token_used_at == null && tokenHash == verification_token_hash && Date.now()<token_expires_at.getTime()){
            await prisma.emailVerification.update({
                where:{
                    userId:req.id
                },
                data:{
                    email_verified:true,
                    token_used_at:new Date()
                }
            });
            res.status(200).json({'success':true,'message':'email verified successfully'});  
        }
        else if(tokenHash!=verification_token_hash){
            res.status(400).json({'success':false,'error':'verification token is incorrect!'});
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
        res.status(500).json({'success':false,'error':'unexpected server error!'});
    }
}

export default verifyEmailToken;