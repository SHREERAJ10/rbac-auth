import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const checkEmailAlreadyVerified = async (req, res, next) => {

  try{
    const userData = await prisma.emailVerification.findFirst({
      where: {
        userId: req.id,
      },
      select: {
        email_verified: true,
      },
    });
  
    if(userData!=null){
      const {email_verified} = userData;
      if(email_verified==true){
          res.status(409).json({'message':'email already verified'});
      }
      else if(email_verified==false){
        next();
      }
      else{
        res.status(500).json({'error':'unexpected error'})
      }
    }
    else{
      next();
    }
  }
  catch (err){
    console.log(err);
    res.status(500).json({'success':false,'error':'unexpected server error!'});
  }

};

export default checkEmailAlreadyVerified;
