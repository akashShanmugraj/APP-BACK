const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({

    parentPost:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    comment:{
        type: String,
        required: true
    },
    commentDate:{
        type: Date,
        required: true
    },
    commentAuthor:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    commentLikes:{
        type: Number,
        required: false
    },
    commentDislikes:{
        type: Number,
        required: false
    },
    commentTags:[{
        type: String,
        required: false
    }],
    subComments:[{
        type: mongoose.Schema.Types.ObjectId,
        required: false
    }],

});

const Comment = mongoose.model("Comment", commentSchema);   

module.exports = Comment;