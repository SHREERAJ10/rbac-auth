import crypto from 'crypto';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const emailVerification = async (req, res)=>{

    const tokenExpiresInHours = 3;
    const userId = req.id;
    //generate token
    const verificationToken = crypto.randomBytes(64).toString('hex');
    
    const tokenHash = crypto.createHash('sha256').update(verificationToken).digest('hex');

    await prisma.emailVerification.create({
        data:{
            userId: userId,
            verification_token_hash: tokenHash,
            token_created_at: new Date(),
            token_expires_at: new Date(Date.now() + tokenExpiresInHours * 60 *60 * 1000), //expiry time in ms
        }
    });
}

export default emailVerification;