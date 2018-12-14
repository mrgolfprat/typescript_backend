import { Request, Response } from 'express'


export function success(res: Response, result: any, code?: number): Response {
    return res.status(code || 200).json({ success: true, result })

}

export function failure(res: Response, message: string, code?: number): Response {
    return res.status(code || 400).json({ success: false, message })

}