import { ZodError, ZodObject } from "zod";

const validate = (schema: ZodObject) => async (req, res, next)=>{
    try{
        const data = req.body;
        req.validatedData = await schema.parseAsync(data);
        next();
    }   
    catch (err){
        if(err instanceof ZodError){
            console.log(err);
            res.status(400).json({"success":false,"error":"invalid input!"});
        }
        else{
            console.log(err);
            res.status(500).json({"success":false,"error":"server error!"});
        }
    }
}

export default validate;