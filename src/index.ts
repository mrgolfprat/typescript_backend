import "reflect-metadata";
import { createConnection } from "typeorm";
import * as Express from 'express'
import * as cors from 'cors'
import { debug } from './config/debug'
import * as bodyParser from 'body-parser'
import * as helmet from 'helmet'
import * as rateLimit from 'express-rate-limit'
import * as passport from 'passport'
import { getCustomRepository } from 'typeorm'
import UserMapper from './mapper/UserMapper'
import { UserIF } from './entity/User'

// route
import * as route from './api'

const app: Express.Application = Express()
const port: string | number = process.env.PORT || 3018
const version: string = "/api/v1"

// use helmet
app.use(helmet())

// set trust proxy
app.enable("trust proxy")

// use cors
const whitelist = ['http://localhost:3000', undefined]
const corsOption = {
    origin: (origin, callback) => {
        debug('origin %o', origin)
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allow by CORS"))
        }
    },
    optionsSuccessStatus: 200,
    preflightContinue: true,
    credentials: true
}

app.use(cors(corsOption))

// use body parser
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(bodyParser.json({ limit: '50mb' }))

// set rate limit
const limiter = new rateLimit({ windowMs: 10 * 60 * 1000, max: 24 })
app.use(limiter)

// connect database
createConnection()

// passport 
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user: UserIF, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id: number, done) => {
    try {
        const userRepository = getCustomRepository(UserMapper)
        const user = await userRepository.findById(id)
        return done(null, user)
    } catch (error) {
        debug("get user error")
        return done(new Error('get admin failure'))
    }
})


app.use(version + '/auth', route.auth)

app.listen(port, () => debug("listing at port %o", port))

