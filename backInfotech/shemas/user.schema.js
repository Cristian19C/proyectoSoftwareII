import {z} from 'zod'

//validar que se registren todos los datos que se piden en el formulario de registro de usuarios
export const registerUserShema = z.object({
    username: z.string({
        required_error: 'El nombre es requerido'
    }),

    lastname: z.string({
        required_error: 'El apellido es requirido'
    }),

    email: z.string({
        required_error: 'El correo es requerido'
    }).email({
        message: 'El correo es invalido'
    }),

    password: z.string({
        required_error: 'La constraseña es requerida'
    }).min(8,{
        message: 'La constresaña debe tener mínimo 8 caracteres'
    }),

    address: z.string({
        required_error: 'La direccion es requerida'
    }),

})

//modelo para la peticion de login, de forma que se envien todos los datos necesarios
export const loginUserSchema = z.object({
    emial: z.string({
        required_error: 'El correo es requerido'
    }).email({
        message: 'El correo es invalido'
    }),

    password: z.string({
        required_error: 'Contraseña es requerida'
    })
})