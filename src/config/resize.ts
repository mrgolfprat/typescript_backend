import * as sharp from 'sharp'
import * as randomstring from 'randomstring'
import * as fs from 'fs'
import * as path from 'path'
import { promisify } from 'util'

const unlinkAsync = promisify(fs.unlink)

export const resize = (filepath: string, size?: number) => {
    return new Promise((resolve, reject) => {
        const filename = `${randomstring.generate(10)}.png`
        const newPath = path.join(__dirname, '..', 'public', filename)
        sharp(filepath)
            .resize(size || 250)
            .toFile(newPath, async (err, info) => {
                try {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(filename)
                    }
                    await unlinkAsync(filepath)
                } catch (error) {
                    reject(error)
                }
            })
    })
}

export const unlinkFile = async (filename: string) => {
    if (filename) {
        const fullpath = path.join(__dirname, '..', 'public', filename)
        await unlinkAsync(fullpath)
        return 'remove file success'
    }

    return "no image to remove"
}