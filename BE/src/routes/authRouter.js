import { Router } from "express";
import authController from "../MC/Controller/authController.js";

const authRouter = Router()

authRouter.post('/register', authController.register, authController.login)
authRouter.post('/login', authController.login)
authRouter.post('/refresh', authController.refreshToken)
authRouter.get('/delete', authController.deleteUser)
// authRouter.get('/create', authController.fakeUsers)

export default authRouter