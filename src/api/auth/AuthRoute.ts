import { Router, Request, Response } from 'express'
import { check } from 'express-validator/check'
import { validator } from '../../middleware/validator'
import AuthController from './AuthController'
import * as passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { success, failure } from '../../config/response'
import { err } from '../../config/debug';
const router = Router()

passport.use(new LocalStrategy(AuthController.LocalFunction))

router.post('/register', [
    check('firstname').isString(),
    check('lastname').isString(),
    check('age').isNumeric(),
    check('username').isString().isLength({ min: 5 }).trim(),
    check('password').isString().isLength({ min: 5 }).trim()
],
    validator(),
    AuthController.register
)

router.post('/login', (req: Request, res: Response) => {
    passport.authenticate('local', (error, user, info) => {
        if (error) {
            err(error.message, req.originalUrl)
            return failure(res, "some error occur")
        }
        if (!user) {
            // if user not found, redirect to login page
            err("user not found", req.originalUrl)
            return failure(res, "user not found")
        }
        req.logIn(user, (errors) => {
            if (errors) {
                err(errors.message, req.originalUrl)
                return failure(res, error)
            }
            return success(res, 'login success')
        })

    })(req, res)
})


export const auth = router
