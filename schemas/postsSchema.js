const mongoose = require('mongoose');
const { post } = require('../routes/profileRoutes');

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
        type: String,
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
    postLikes: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Assuming User is the model referenced by ObjectId
    }],
    postDislikes:[{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Assuming User is the model referenced by ObjectId
    }],
    postTags:[{
        type: String,
        required: false
    }],
    // postLocation as an array of integers
    postLocation:[{
        type: Number
    }],
    postView: [{ 
        type: String,
        ref: 'User' // Assuming User is the model referenced by ObjectId
    }],
    postViewCounter: {
        type: Number,
        default: 0
    }

});

const Post = mongoose.model("Post", postsSchema);   

module.exports = Post;