import {z, ZodError} from 'zod';

const user = z.object({
    name: z.string().min(3).max(20),
    email: z.email().trim(),
    password: z.string().min(8).trim()
});

export default async function inputValidation(req, res, next){
    try{
        const data = req.body;
        req.validatedData = await user.parseAsync(data);
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