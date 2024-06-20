import mongoose, { Document, Schema } from "mongoose";


export interface IBlog extends Document {
    title: string;
    content: string;
    author: Schema.Types.ObjectId;
    createdAt: Date,
    updatedAt: Date
}

const blogSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Blog = mongoose.model<IBlog>('Blog', blogSchema);

export default Blog;