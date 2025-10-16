import { storeRefreshToken } from "../../utils/auth/storeRefreshToken";

const logout = async (req, res, next)=>{
    try{
        const userID = req.id;
        storeRefreshToken(userID, "");
        next();
    }
    catch (err){
        console.log(err);
        res.status(500).json({'success':false,'error':'internal server error!'});
    }
}

export default logout;