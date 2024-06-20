import { Request, Response } from 'express';
import User, { IUser } from '../models/user.model';
import { comparePassword, hashPassword } from '../utils/hashPass.utils';
import { AuthenticatedRequest } from '../utils/types';
import { generateToken } from '../utils/jwt.utils';


export const register = async (req: AuthenticatedRequest, res: Response) => {
    const { username, email, password, role } = req.body;
    

    try {
        //check if user exists
        const exisitingUser = await User.findOne({ $or: [{ username }, { email }] })
        if (exisitingUser) {
            return res.status(400).json({ message: "User or email already exists" })
        }

        const hashedPassword = await hashPassword(password);

        if (role) {
            // check if user.role is admin
            if (req.user.role !== 'admin') {
                return res.status(401).json({ message: "Unauthorized" })
            }
        }
        const newUser: IUser = new User(
            {
                username, email,
                password: hashedPassword,
                role: role ? role : 'user'
            });

        await newUser.save()
        res.status(201).json({ message: "User created successfully" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ error: "Invalid Credentials" })

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ error: "Invalid Credentials" })

        const token = generateToken({ userId: user._id as string, role: user.role })
        return res.status(200).json({ token })

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}