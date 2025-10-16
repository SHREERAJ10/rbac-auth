import {generateTokenPair} from '../../utils/auth/generateTokenPair'
import { storeRefreshToken } from './storeRefreshToken';

const issueTokens = (req, res, next)=>{
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

        const tokenPair = generateTokenPair(req.id, req.role);
        const {accessToken, refreshToken} = tokenPair;
        req.newRefreshToken = refreshToken
        res.cookie("SessionID", accessToken, accessTokenOptions);
        res.cookie("RefreshToken", refreshToken, refreshTokenOptions);
        
        next();
}   

export default issueTokens;

export const updateRefreshTokenInDB =  async (req, res, next)=>{
    await storeRefreshToken(req.id, req.newRefreshToken); //stores refresh token of user in user's record in DB
    res.json({"success":true});
}

export const resetTokens = (req, res)=>{
  res.cookie("SessionID","");
  res.cookie("RefreshToken","");
  res.status(200).json({"success":true,"message":"successfully logged out!"});
}