import { Request, Response } from "express";
import User from "../models/user.model";
import { hashPassword } from '../utils/hashPass.utils';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createUser = async (req: Request, res: Response) => {
    const { username, email, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }
        const hashedPassword = await hashPassword(password)

        const newUser = new User({ username, email, password: hashedPassword, role });
        await newUser.save();

        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { userId } = req.params
    const { username, email, password, role } = req.body;
    if (!userId) return res.status(400).json({ error: "User ID is required" });

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (password) {
            const hashedPassword = await hashPassword(password);
            user.password = hashedPassword;
        }
        user.username = username || user.username;
        user.email = email || user.email;
        user.role = role || user.role;

        await user.save();

        res.status(200).json(user);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { userId } = req.params
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};