import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import blogRoutes from './routes/blog.routes';

dotenv.config();


const app = express();
app.use(express.json())

//routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/blogs', blogRoutes)

const startDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!)
        console.log('DB connected')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

startDB()

export default app;