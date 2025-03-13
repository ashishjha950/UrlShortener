import express from 'express'
const router = express.Router()
import {addNewUser,verifyUser} from '../controller/User.js'

router.post('/',addNewUser)
router.post('/login',verifyUser)

export default router