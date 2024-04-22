const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    dateOfBirth:{
        type: Date,
        required:true
    },
    aadharNumber:{
        type: Number,
        required: true
    },
    phoneNumber:{
        type: Number,
        required: false
    },
    userName:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    joinedOn:{
        type: Date,
        required: true
    },
    tag: {
        type: String,
        required: false
    },
    location:{
        type: String,
        required: true
    },
    profilePicture:{
        type: String,
        required: false
    },
    profileDescription:{
        type: String,
        required: false
    },
    noOfPosts:{
        type: Number,
        required: false
    },
    postsOrComments:[{
        type: mongoose.Schema.Types.ObjectId,
        required: false
    }],
    blockedUsers:[{
        type: mongoose.Schema.Types.ObjectId,
        required: false
    }]  
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
