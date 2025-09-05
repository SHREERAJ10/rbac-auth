import {z} from 'zod';

export const user = z.object({
    email: z.email().trim(),
    password: z.string().min(8).trim()
});

export const registrationSchema = user.extend({
    name: z.string().min(3).max(20)
});
