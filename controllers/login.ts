import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//test pwd for l.lawliet@gmail.com: sweettooth123
const prisma = new PrismaClient();

enum tokenType {
  access = "ACCESS",
  refresh = "REFRESH",
}

function generateToken(
  payload: object,
  secretKey: string,
  options: object
): string {
  return jwt.sign(payload, secretKey, options); 
}

async function storeRefreshToken(userID:number, refreshToken:string){
    const salt = await bcrypt.genSalt(10);
    const refreshTokenHash = await bcrypt.hash(refreshToken, salt);
    const dataStored = await prisma.user.update({
      where:{
        id:userID
      },
      data:{
        refreshTokenHash: refreshTokenHash
      }
    });
}

const login = async (req, res) => {
  try {
    const data = await req.validatedData;
    const userData = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (userData != null) {
      //authentication logic
      const registeredUser = await bcrypt.compare(
        data.password,
        userData.password
      );

      if (registeredUser) {
        const accessPayload = {
          id: userData.id,
          type: tokenType.access,
          role: userData.role,
        };

        const accessTokenOptions = {
          maxAge: 5 * 60 * 1000, //expires in 5 minutes
          httpOnly: true,
          secure: false, //TODO: Change this to true in Production
        };

        const refreshPayload = {
          id: userData.id,
          type: tokenType.refresh,
        };

        const refreshTokenOptions = {
          maxAge: 20 * 60 * 1000, //expires in 20 minutes
          httpOnly: true,
          secure: false, //TODO: Change this to true in Production
        };

        const accessToken = generateToken(
          accessPayload,
          process.env.TOKEN_SECRET,
          { expiresIn: "5m" }
        );

        const refreshToken = generateToken(
          refreshTokenOptions,
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "1d" }
        );

        res.cookie("SessionID", accessToken, accessTokenOptions);
        res.cookie("RefreshToken", refreshToken, refreshTokenOptions);
        storeRefreshToken(userData.id, refreshToken); //stores refresh token of user in user's record in DB
        res.status(200).json({ success: true, message: "login successful" });
      } else {
        res.status(400).json({ success: false, error: "wrong password" });
      }
    } else {
      res
        .status(404)
        .json({ success: false, error: "email is not registered!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: "server error!" });
  }
};

export default login;
