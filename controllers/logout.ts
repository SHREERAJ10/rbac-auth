import { storeRefreshToken } from "./login";

const logout = async (req, res, next)=>{
    const userID = req.id;
    storeRefreshToken(userID, "");
    next();
}

export default logout;