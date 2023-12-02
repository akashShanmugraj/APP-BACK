import mongoose from "mongoose";

const postsSchema = new mongoose.Schema({
    postTitle:{
        type: String,
        required: true
    },
    postDescription:{
        type: String,
        required: true
    },
    postImage:{
        type: Buffer,
        required: false
    },
    postImageType:{
        type: String,
        required: false
    },
    postDate:{
        type: Date,
        required: true
    },
    postAuthor:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    postComments:[{
        type: mongoose.Schema.Types.ObjectId,
        required: false
    }],
    postLikes:{
        type: Number,
        required: false
    },
    postDislikes:{
        type: Number,
        required: false
    },
    postTags:[{
        type: String,
        required: false
    }],

});

const Post = mongoose.model("Post", postsSchema);   

export default Post;