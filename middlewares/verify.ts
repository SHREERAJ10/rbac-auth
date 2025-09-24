import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

dotenv.config();
const prisma = new PrismaClient();

type decodedPayloadType = {
  id:number,
  type:string
}

export const verifyAccessToken =
  (secretKey: string) => async (req, res, next) => {
    try {
      //access the accessToken from cookies
      const accessToken = req.cookies.SessionID;

      //verify token signature
      jwt.verify(accessToken, secretKey, async function (err, decoded:decodedPayloadType) {
        if (err) {
          console.log(err);
          res.status(401).json({ success: false, error: "Invalid token" });
        }
        const { id, type } = decoded;

        const userExists = await prisma.user.findFirst({
          where: {
            id: id,
          },
        });

        //verify tokenType
        if (type === "ACCESS" && userExists != null) {
          req.id = id;
          next();
        }
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, error: "server error!" });
    }
  };

export const verifyRefreshToken =
  (secretKey: string) => async (req, res, next) => {
    try {
      const refreshToken = req.cookies.RefreshToken;
      
      jwt.verify(refreshToken, secretKey,async (err, decoded:decodedPayloadType) => {
        if (err) {
          console.log(err);
          res.status(401).json({ success: false, error: "Invalid token" });
        }
        const { id, type } = decoded;
        
        //verify if user exists
        const userExists = await prisma.user.findFirst({
          where: {
            id: id,
          }
        });

        //verify tokenType
        if (type === "REFRESH" && userExists!=null) {
          req.id = id;
          req.refreshToken = refreshToken;
          next();
        }
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, error: "server error!" });
    }
  };

export const verifyRole = async (req, res, next) => {
  try {
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
    } else {
      res.status(403).json({ success: false, error: "access denied!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: "server error!" });
  }
};

export const verifyRefreshTokenInDB = async (req, res, next)=>{
  const data = await prisma.user.findFirst({
    where:{
      id:req.id
    },
    select:{
      refreshTokenHash:true
    }
  })
  bcrypt.compare(req.refreshToken, data.refreshTokenHash, (err, res)=>{
    if(err){
      console.log(err);
      //send res here
    }
    else{
      next();
    }
  });
}