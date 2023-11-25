import {Router} from 'express'
const router = Router()

//funciones para la coleccion de usuarios
import {obtainAllUsers, saveUser, findUserById, deleteUser, loginUser, sendMailRecoveryPass, updatePassword, profile, verifyToken} from '../controllers/controll_user.js'

//modelo para la validacion del cuerpo de las peticiones
import { registerUserShema, loginUserSchema } from '../shemas/user.schema.js'
//funcion para validar el modelo de las peticiones
import { validateSchema } from '../middlewares/validatorUser.js'
import { authRequired } from '../middlewares/validateToken.js'

//configuracion de rutas para la parte de usuarios
router.get('/', obtainAllUsers)
router.post('/registerUser', validateSchema(registerUserShema), saveUser)
router.get('/:id', findUserById)
router.delete('/:id', deleteUser)
router.post('/login', validateSchema(loginUserSchema),loginUser)
router.post('/updatePassword', updatePassword)
router.post('/sendEmail/:email', sendMailRecoveryPass)
router.post('verify', verifyToken)
router.get('/profile', authRequired, profile)

export default router