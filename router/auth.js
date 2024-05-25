import express from 'express'
import { body } from 'express-validator'
import * as authController from '../controller/auth.js'
import { isAuth } from '../middleware/auth.js'
import { validate } from '../middleware/validator.js'

const router = express.Router()

// login 유효성 검사
const validateLogin = [
  body('email').isEmail().normalizeEmail().withMessage('invalid email'),
  body('password')
    .trim()
    .isLength({ min: 5 })
    .withMessage('password should be at least 5 characters'),
  validate,
]

// signup 유효성 검사
const validateSignup = [
  ...validateLogin,
  body('nickname').notEmpty().withMessage('nickname is missing'),
  validate,
]

// controller에 위임
router.post('/signup', validateSignup, authController.signup)

router.post('/login', validateLogin, authController.login)

router.get('/me', isAuth, authController.me)

export default router
