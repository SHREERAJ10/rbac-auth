import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { generateTokenPair } from "../../utils/auth/generateTokenPair";
import { storeRefreshToken } from "../../utils/auth/storeRefreshToken";

dotenv.config();

const prisma = new PrismaClient();

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

        const accessTokenOptions = {
          maxAge: 5 * 60 * 1000, //expires in 5 minutes
          httpOnly: true,
          secure: false, //TODO: Change this to true in Production
        };

        const refreshTokenOptions = {
          maxAge: 20 * 60 * 1000, //expires in 20 minutes
          httpOnly: true,
          secure: false, //TODO: Change this to true in Production
        };

        const tokenPair = generateTokenPair(userData.id, userData.role);
        const {accessToken, refreshToken} = tokenPair;

        res.cookie("SessionID", accessToken, accessTokenOptions);
        res.cookie("RefreshToken", refreshToken, refreshTokenOptions);
        storeRefreshToken(userData.id, refreshToken); //stores refresh token of user in user's record in DB
        res.status(200).json({ success: true, message: "login successful" });
      } 
      else {
        res.status(400).json({ success: false, error: "wrong password" });
      }

    } 
    else {
      res.status(404).json({ success: false, error: "email is not registered!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: "server error!" });
  }
};

export default login;
