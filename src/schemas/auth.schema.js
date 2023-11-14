import {z} from 'zod'

export const registeSchema = z.object({
    username: z.string({
        required_error: "Username is required"
    }),    
    email: z.string({
        required_error: "Email required"
    }).email({
        message: "Email invalid"
    }), 
    password: z.string({
        required_error: "Password is required"
    }).min(6, {
        message: "Password must be at least 6 character"
    })
});

export const loginSchema = z.object({
    email: z.string({
        required_error: "Email is required"
    }).email({
        message: "Email is invalid"
    }),
    password: z.string({
        required_error: "Password is required"
    }).min(6, {
        message: "Password must be at least 6 character"
    })
})