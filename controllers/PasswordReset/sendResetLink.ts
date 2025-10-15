import {PrismaClient} from '@prisma/client';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

const sendResetLink = async (req, res, next)=>{
    try{
            const userId = req.id;
            const testAccount = await nodemailer.createTestAccount();
            const url = "http://"+req.get('host')+"/reset/password/token?selector="+req.selector+"&token="+req.resetToken;
    
            const userEmail = (await prisma.user.findFirst({
                where:{
                    id: userId
                },
                select:{
                    email:true
                }
            }))["email"]; //send mail to userEmail in production
        
            const transporter = nodemailer.createTransport({
                host:"smtp.ethereal.email",
                port: 587,
                secure:false,
                auth: {
                    user:testAccount.user,
                    pass: testAccount.pass
                },
            });
        
            let info = await transporter.sendMail({
            from: '"Testing" <test@example.com>',
            to: "receiver@example.com",
            subject: "Hello",
            text: `Click here to reset your password: ${url}`, // plain‑text body
            html: `<a href=${url}>Reset Password</a>
                    <p>${url}</p>`, // HTML body
          });
        
          console.log(nodemailer.getTestMessageUrl(info));
          res.status(200).json({"success":true, "message":"reset link has been sent"});
        }
        catch (err){
            console.log(err);
            res.status(500).json({'success':false,'error':'unexpected server error!'});
        }
}

export default sendResetLink;