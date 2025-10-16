import { ZodError, ZodObject } from "zod";

const validateSchema = (schema: ZodObject) => async (req, res, next)=>{
    try{
        const data = req.body;
        req.validatedData = await schema.parseAsync(data); //note: we provide schema (input data pattern) as argument to this function
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

export default validateSchema;