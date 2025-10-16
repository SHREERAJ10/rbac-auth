import nodemailer from 'nodemailer';
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();


const sendVerificationEmail = async (req, res)=>{

    try{
        const userId = req.id;
        const testAccount = await nodemailer.createTestAccount();
        const url = "http://"+req.get('host')+"/verify/email/token?token="+req.verificationToken;

        const emailToBeVerified = (await prisma.user.findFirst({
            where:{
                id: userId
            },
            select:{
                email:true
            }
        }))["email"]; //send mail to emailToBeVerified in production
    
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
        text: `Verify your email: ${url}`, // plain‑text body
        html: `<a href=${url}>Verify</a>
                <p>Send <b>GET</b> request to this from Postman: <br> <br> ${url}</p>`, // HTML body
      });
    
      console.log(nodemailer.getTestMessageUrl(info));
      res.status(200).json({"success":true, "message":"verification email has been sent"});
    }
    catch (err){
        console.log(err);
        res.status(500).json({'success':false,'error':'unexpected server error!'});
    }
}

export default sendVerificationEmail;