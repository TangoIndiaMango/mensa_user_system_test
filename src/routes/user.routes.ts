import express from 'express';
import { authenticateToken } from '../middlewares/auth.middleware';
import { isAdmin } from '../middlewares/role.middleware';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from '../controllers/user.controller';

const router = express.Router()

router.get('/', authenticateToken, isAdmin, getAllUsers)
router.get('/:userId', authenticateToken, isAdmin, getUserById)
router.post('/', authenticateToken, isAdmin, createUser);
router.patch('/:userId', authenticateToken, isAdmin, updateUser);
router.delete('/:userId', authenticateToken, isAdmin, deleteUser);

export default router