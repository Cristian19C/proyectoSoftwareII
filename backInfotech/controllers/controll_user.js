const user = require('../models/user')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')

module.exports = {
    saveUser: async (req, res) => {
        try {
            const {id, name, lastname, email, password, phone, address, role} = req.body
            const User = await user.findOne({email: email})
            if (!User){
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(password, salt)
                const newUser = new user({
                    id,
                    name,
                    lastname,
                    email,
                    password: hashedPassword,
                    phone,
                    address,
                    role
                })

                const dataUserSave = await newUser.save()
                return res.status(200).json({
                    "status": true,
                    "dataUserSave": dataUserSave
                })
            }else{
                return res.status(200).json({
                    "status": false,
                    "message": "Correo ya registrado"
                })
            }
        }catch (error){
            return res.status(500).json({
                "status":  false,
                "error": error
            })
        }
    }, 
    obtainAllUsers: async (req, res) => {
        try{
            const dataUsers = await user.find()
            return res.status(200).json({
                "status": true,
                "dataUsers": dataUsers
            })
        } catch (error){
            return res.status(500).json({
                "status": false,
                "error": error
            })
        }
    },
    findUserById: async(req, res) => {
        try {
            const id = req.params.id
            const dataUser = await user.findById(id)
            return res.status(200).json({
                "status": true,
                "dataUser": dataUser
            })
        }catch (error){
            return res.status(500).json({
                "status": false,
                "error": error
            })
        }
    },
    deleteUser: async (req, res) => {
        try{
            const id = req.params.id
            const userDeleted = await user.findByIdAndDelete(id)
            return res.status(200).json({
                "status": true,
                "userDeleted": userDeleted
            })
        }catch (error) {
            return res.status(500).json({
                "status": false,
                "error": error
            })
        }
    }, 
    loginUser: async (req, res) => {
        try{
            const {email, password} = req.body
            const User = await user.findOne({email:email})
            console.log(User);
            if(!User){
                return res.status(404).json({
                    "status": false,
                    "message": "Usuario no encontrado"
                })
            }

            const passwordMatch = await bcrypt.compare(password, User.password)
            if(!passwordMatch){
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
        }catch (error) {
            return res.status(500).json({
                "status": false,
                "error": error
            })
        }
    },
    sendMailRecoveryPass: async (req, res) => {
        const {email} = req.params
        const linkRecoveryPassword = req.body.linkRecoveryPassword
        const User = await user.findOne({email: email})
        if(User){
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'remainsystem32@gmail.com',
                    pass: 'ohgw qzed pyzt bppq'
                }
            });

            const mailOptions = {
                from: 'remainsystem32@gmail.com',
                to: email,
                subject: 'Recuperacion de clave',
                text: `Ingresa al siguiente link para cambiar la contraseña: ${linkRecoveryPassword}`
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if(error){
                    console.log('Error al enviar el correo electronico', error);
                    return res.status(200).json({"state": false, "message": error})
                }else{
                    console.log('Correo electronico enviado con exito', info.response);
                    return res.status(200).json({"state": true, "message": "funciono"})
                }
            })
        }else{
            return res.status(404).json({
                "state": false,
                "message": "No se encontro el correo"
            })
        }
    },
    updatePassword: async (req, res) => {
        const {emailSearch, newPassword} = req.body
        const salt = await bcrypt.genSalt(10)
        const newHashedPassword = await bcrypt.hash(newPassword, salt)

        try {
            const updateUser = await user.findOneAndUpdate(
                {email: emailSearch},
                {password: newHashedPassword},
                {new : true}
            )

            if(updateUser){
                return res.status(200).json({
                    state: true, updateUser
                })
            }else{
                return res.status(500).json({
                    state: false,
                    message: "Usuario no encontrado"
                })
            }
        }catch (error){
            return res.status(500).json({
                state: false,
                message: error.message
            })
        }
    }
}