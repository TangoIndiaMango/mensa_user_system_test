import express from "express";
import { createBlog, getAllBlogs, getBlogById } from "../controllers/blog.controller";
import { authenticateToken } from "../middlewares/auth.middleware";


const router = express.Router()


router.get('/', authenticateToken, getAllBlogs);
router.post('/', authenticateToken, createBlog);
router.get('/:blogId', authenticateToken, getBlogById)

export default router;