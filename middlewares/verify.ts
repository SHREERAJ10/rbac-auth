import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const prisma = new PrismaClient();

export const verifyAccessToken =
  (secretKey: string) => async (req, res, next) => {
    try {
      //access the accessToken from cookies
      const accessToken = req.cookies.SessionID;

      //verify token signature
      jwt.verify(accessToken, secretKey, async function (err, decoded) {
        if (err) {
          console.log(err);
          res.status(401).json({ success: false, error: "Invalid token" });
        }
        const { id, type } = decoded;

        //verify tokenType
        if (type === "ACCESS") {
          req.id = id;
          next();
        }
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, error: "server error!" });
    }
  };

export const verifyRefreshToken = (secretKey:string) =>async (req, res, next) =>{
    try{
        const refreshToken = req.cookies.RefreshToken;
        jwt.verify(refreshToken, secretKey, (err, decoded)=>{
            if (err) {
              console.log(err);
              res.status(401).json({ success: false, error: "Invalid token" });
            }
            const { id, tokenType } = decoded;            
    
            //verify tokenType
            if (tokenType === "REFRESH") {
              req.id = id;
              next();
            }
        });

    }
    catch (err) {
      console.log(err);
      res.status(500).json({ success: false, error: "server error!" });
    }
}

export const verifyRole = async (req, res, next) => {
  try {
    console.log(req.id);
    const userRole = await prisma.user.findUnique({
      select: {
        role: true,
      },
      where: {
        id: req.id,
      },
    });
    if (userRole["role"] === "admin") {
      next();
    } 
    else {
      res.status(403).json({ success: false, error: "access denied!" });
    }
  } 
  catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: "server error!" });
  }
};
