import mongoose , { Schema } from "mongoose";

const postSchema = new Schema(
    {
        title: String,
        content: String,
        img: String,
        
    }
);

const Post = mongoose.models.Post || mongoose.model("Post",postSchema);

export default Post;