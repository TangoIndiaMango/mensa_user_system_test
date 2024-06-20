import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../utils/types";

export const isAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { role } = req.user

    if (role !== 'admin') return res.status(403).json({ error: 'Forbidden: Admin role required' })

    next()
}