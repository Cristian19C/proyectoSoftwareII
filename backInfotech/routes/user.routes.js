import { Router } from 'express'
const router = Router()

import {obtainAllUsers, saveUser, findUserById, deleteUser, loginUser, sendMailRecoveryPass, updatePassword} from '../controllers/controll_user.js'



router.get('/', obtainAllUsers)
router.post('/', saveUser)
router.get('/:id', findUserById)
router.delete('/:id', deleteUser)
router.post('/login', loginUser)
router.post('/updatePassword', updatePassword)
router.post('/sendEmail/:email', sendMailRecoveryPass)

module.exports = router