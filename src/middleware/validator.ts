import { validationResult } from 'express-validator/check'
import { Response, NextFunction } from 'express'
import { unlinkFile } from '../config/resize'

export const validator = () =>
    (req, res: Response, next: NextFunction) => {
        const errors = validationResult(req)
        const { file } = req

        if (!errors.isEmpty) {
            if (file) {
                unlinkFile(file.filename)
            }
            return res.status(422).json({ success: false, message: errors.array() })
        }
        next()
    }