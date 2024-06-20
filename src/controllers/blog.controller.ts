import { Response, Request } from "express";
import Blog, { IBlog } from "../models/blog.model";
import { AuthenticatedRequest } from "../utils/types";


export const getAllBlogs = async (req: Request, res: Response) => {
    try {
        const blogs = await Blog.find().populate('author', 'username');
        return res.status(200).json({ blogs })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

export const createBlog = async (req: AuthenticatedRequest, res: Response) => {
    const { title, content } = req.body;
    const { userId } = req.user
    try {
        const newBlog = new Blog({ title, content, author: userId });
        await newBlog.save();

        return res.status(201).json({ newBlog })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

export const getBlogById = async (req: Request, res: Response) => {
    const { blogId } = req.params;
    try {
        const blog = await Blog.findById(blogId).populate('author', 'username');
        if (!blog) {
            return res.status(404).json({ error: "Blog not found" })
        }
        return res.status(200).json({ blog })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}