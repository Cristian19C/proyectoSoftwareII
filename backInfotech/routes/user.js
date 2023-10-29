const express = require('express')
const router = express.Router()

const {obtainAllUsers, saveUser, findUserById, deleteUser, loginUser, sendMailRecoveryPass, updatePassword} = require('../controllers/controll_user')

router.get('/', obtainAllUsers)
router.post('/', saveUser)
router.get('/:id', findUserById)
router.delete('/:id', deleteUser)
router.post('/login', loginUser)
router.post('/updatePassword', updatePassword)
router.post('/sendEmail/:email', sendMailRecoveryPass)

module.exports = router