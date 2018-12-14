import * as impDebug from 'debug'
import * as moment from 'moment'
import * as winston from 'winston'
import * as path from 'path'

const _debug = impDebug("debuging:debug")
const _error = impDebug("debuging:error")


export const debug = _debug


export const err = (msg: string, url: string) => {

    if (process.env.NODE_ENV == 'production') {
        const logger = winston.createLogger({
            level: "error",
            format: winston.format.json(),
            transports: [
                new winston.transports.File({ filename: path.join(__dirname, '..', 'logs', `${moment().format('YYYY-MM-DD')}-err.log`), level: 'error' })
            ]
        })

        return logger.error(`${moment().format("HH:mm:ss")}/${url ? url : ''} => ${msg}`)
    } else {
        return _error("error with message: %o", msg)
    }

}


