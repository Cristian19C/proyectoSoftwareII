import user from '../models/user.js'
import { genSalt, hash, compare } from 'bcrypt'
import { createTransport } from 'nodemailer'

export async function saveUser(req, res) {
    try {
        const { id, name, lastname, email, password, phone, role } = req.body
        const User = await user.findOne({ email: email })
        if (!User) {
            const salt = await genSalt(10)
            const hashedPassword = await hash(password, salt)
            const newUser = new user({
                id,
                name,
                lastname,
                email,
                password: hashedPassword,
                phone,
                role
            })

            const dataUserSave = await newUser.save()
            return res.status(200).json({
                "status": true,
                "dataUserSave": dataUserSave
            })
        } else {
            return res.status(200).json({
                "status": false,
                "message": "Correo ya registrado"
            })
        }
    } catch (error) {
        return res.status(500).json({
            "status": false,
            "error": error
        })
    }
}
export async function obtainAllUsers(req, res) {
    try {
        const dataUsers = await user.find()
        return res.status(200).json({
            "status": true,
            "dataUsers": dataUsers
        })
    } catch (error) {
        return res.status(500).json({
            "status": false,
            "error": error
        })
    }
}
export async function findUserById(req, res) {
    try {
        const id = req.params.id
        const dataUser = await user.findById(id)
        return res.status(200).json({
            "status": true,
            "dataUser": dataUser
        })
    } catch (error) {
        return res.status(500).json({
            "status": false,
            "error": error
        })
    }
}
export async function deleteUser(req, res) {
    try {
        const id = req.params.id
        const userDeleted = await user.findByIdAndDelete(id)
        return res.status(200).json({
            "status": true,
            "userDeleted": userDeleted
        })
    } catch (error) {
        return res.status(500).json({
            "status": false,
            "error": error
        })
    }
}
export async function loginUser(req, res) {
    try {
        const { email, password } = req.body
        const User = await user.findOne({ email: email })
        console.log(User)
        if (!User) {
            return res.status(404).json({
                "status": false,
                "message": "Usuario no encontrado"
            })
        }

        const passwordMatch = await compare(password, User.password)
        if (!passwordMatch) {
            return res.status(401).json({
                "status": false,
                "message": "Contraseña incorrecta"
            })
        }
        return res.status(200).json({
            "status": true,
            "data": User,
            "message": "Inicio de sesión exitoso"
        })
    } catch (error) {
        return res.status(500).json({
            "status": false,
            "error": error
        })
    }
}
export async function sendMailRecoveryPass(req, res) {
    const { email } = req.params
    const linkRecoveryPassword = req.body.linkRecoveryPassword
    const User = await user.findOne({ email: email })
    if (User) {
        const transporter = createTransport({
            service: 'Gmail',
            auth: {
                user: 'remainsystem32@gmail.com',
                pass: 'ohgw qzed pyzt bppq'
            }
        })

        const mailOptions = {
            from: 'remainsystem32@gmail.com',
            to: email,
            subject: 'Recuperacion de clave',
            text: `Ingresa al siguiente link para cambiar la contraseña: ${linkRecoveryPassword}`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error al enviar el correo electronico', error)
                return res.status(200).json({ "state": false, "message": error })
            } else {
                console.log('Correo electronico enviado con exito', info.response)
                return res.status(200).json({ "state": true, "message": "funciono" })
            }
        })
    } else {
        return res.status(404).json({
            "state": false,
            "message": "No se encontro el correo"
        })
    }
}
export async function updatePassword(req, res) {
    const { emailSearch, newPassword } = req.body
    const salt = await genSalt(10)
    const newHashedPassword = await hash(newPassword, salt)

    try {
        const updateUser = await user.findOneAndUpdate(
            { email: emailSearch },
            { password: newHashedPassword },
            { new: true }
        )

        if (updateUser) {
            return res.status(200).json({
                state: true, updateUser
            })
        } else {
            return res.status(500).json({
                state: false,
                message: "Usuario no encontrado"
            })
        }
    } catch (error) {
        return res.status(500).json({
            state: false,
            message: error.message
        })
    }
}

export async function logout (req, res) {
    console.log('entro logout');
    res.cookie('token','', {
        expires: new Date(0)
    })

    return res.sendStatus(200)
}

//prueba de lgoueo y registro
export async function prueba (req, res) {
   

    return res.status(200)
}

export async function profile(req, res) {
    const userFound = await user.findById(req.user.id)

    if (!userFound) return res.status(404).json({
        message: 'Usuario no encontrado'
    })

    return res.json({
        id_: userFound._id,
        id: userFound.id,
        name: userFound.name,
        lastname: userFound.lastname,
        email: userFound.email
    })
}
export async function verifyToken(req, res) {
    console.log('verifyToken');
    const { token } = req.cookies

    if (!token) return res.status(401).json({
        message: 'No existe autorizacion'
    })

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({
            message: 'No existe autorizacion'
        })

        const userFound = await user.findById(user.id)
        if (!userFound) return res.status(401).json({
            message: 'No existe autorizacion'
        })


        return res.json({
            id_: userFound._id,
            id: userFound.id,
            name: userFound.name,
            lastname: userFound.lastname,
            email: userFound.email
        })
    })
}