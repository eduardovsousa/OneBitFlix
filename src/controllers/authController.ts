import { Request, Response } from "express";
import { userService } from "../services/userService";

export const authController = {
    register: async(req: Request, res: Response) => {
        const { firstName, lastName, email, password, birth, phone } = req.body

        try { 
            const userAlreadyExists = await userService.findByEmail(email)

            if (userAlreadyExists) {
                throw new Error('This e-mail is already registered.')
            }

            const user = await userService.create({ 
                firstName,
                lastName,
                email,
                password,
                birth,
                phone,
                role: 'user'
            })

            return res.status(201).json(user)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    }
}