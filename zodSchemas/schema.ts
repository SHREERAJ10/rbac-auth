import {z} from 'zod';

export const emailSchema = z.object({
    email:z.email().trim()
});

export const passwordSchema = z.object({
    password: z.string().min(8).trim()
})

export const loginSchema = z.object({
    email: z.email().trim(),
    password: z.string().min(8).trim()
});

export const registrationSchema = loginSchema.extend({
    name: z.string().min(3).max(20)
});
