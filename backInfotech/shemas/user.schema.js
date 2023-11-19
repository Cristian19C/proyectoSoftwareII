import {z} from 'zod'

export const registerUserShema = z.object({
    username: z.string({
        required_error: 'name is required'
    }),

    lastname: z.string({
        required_error: 'lastname is required'
    }),

    email: z.string({
        required_error: "email is required"
    }).email({
        message: "invalid email"
    }),

    password: z.string({
        required_error: 'password is required'
    }).min(8,{
        message: 'password must be at least 8 characters long'
    }),

    address: z.string({
        required_error: 'address is required'
    }),

    role: z.string({
        required_error: 'role is required'
    })



})