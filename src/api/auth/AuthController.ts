import { getCustomRepository } from 'typeorm'
import UserMapper from '../../mapper/UserMapper'
import { success, failure } from '../../config/response'
import { err, debug } from '../../config/debug'
import { Response, Request, NextFunction } from 'express'


import { hash, compare } from 'bcrypt'

class AuthController {

    // register
    async register(req: Request, res: Response) {
        try {
            const { firstname, lastname, password, username, age } = req.body
            const Repository = getCustomRepository(UserMapper)
            const hashPassword = await hash(password, 10)

            await Repository.insertUser(firstname, lastname, age, username, hashPassword)

            success(res, 'register success')
        } catch (error) {
            err(error.message, req.originalUrl)
            failure(res, 'register failure')
        }
    }

    // passport method


    LocalFunction = async (username, password, done) => {
        debug("@flow login")
        try {
            const authRepo = getCustomRepository(UserMapper)
            const user = await authRepo.findUserByUsername(username)

            if (!user) {
                done(null, false, { message: "Incorrect username or password" })

            } else if (await compare(password, user.password)) {
                debug("@password currect")
                done(null, user)
            } else {
                err("some error occur", "@flow login")
                done(null, false, { message: "some error occur" })
            }

        } catch (error) {
            err(error.message, '@flow login')
            done(null, false, { message: 'Login failure' })
        }
    }


}

export default new AuthController()



