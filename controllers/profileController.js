const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Profile = require('../schemas/profileSchema.js');
const bcrypt = require('bcrypt');
const fs = require('fs');


//fetch all profiles
const getProfiles = asyncHandler(async (req, res) => {
    const profiles = await Profile.find({})
    res.json(profiles)
});

//fetch profile by id
const getProfileById = asyncHandler(async (req, res) => {
    const profile = await Profile.findById(req.params.id)

    if(profile){
        res.json(profile)
    }else{
        res.status(404)
        throw new Error('Profile not found')
    }
});

//fetch profile by username

const getProfileByUsername = asyncHandler(async (req, res) => {
    const profile = await Profile.findOne({userName: req.params.userName})

    if(profile){
        res.json(profile)
    }else{
        res.status(404)
        throw new Error('Profile not found')
    }
}
);

//create profile
const createProfile = asyncHandler(async (req, res) => {
    console.log(req.body)
    // Extract profile data from request body
    const {
        name,
        dob,
        aadharNumber,
        phoneNumber,
        userName,
        password,
        joinedOn,
        location,
        profileDescription,
        noOfPosts,
        postsOrComments,
        blockedUsers
    } = req.body;

    // // Check if required fields are provided
    if (!dob || !name || !aadharNumber || !userName || !password || !joinedOn || !location) {
        res.status(400).json({ message: 'Please provide all required fields' });
        return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Read the file content and convert it to a Base64 string
    const profilePicturePath = req.file ? req.file.path : null;
    let profilePictureBase64 = null;
    if (profilePicturePath) {
        const fileContent = fs.readFileSync(profilePicturePath);
        profilePictureBase64 = fileContent.toString('base64');
    }

    // Create the profile document
    const profile = new Profile({
        name,
        dateOfBirth: dob,
        aadharNumber,
        phoneNumber,
        userName,
        password: hashedPassword,
        joinedOn,
        location,
        profilePicture: profilePictureBase64,
        profileDescription,
        noOfPosts,
        postsOrComments,
        blockedUsers
    });

    try {
        // Save the profile document to MongoDB
        const createdProfile = await profile.save();
        res.status(201).json(createdProfile);
        // res.status(201).json(profilePictureBase64);
        console.log('Profile created successfully');
    } catch (error) {
        res.status(400).json({ message: 'Error creating profile', error: error.message });
    }
});



//update profile
const updateProfile = asyncHandler(async (req, res) => {
    const {
        firstName,
        lastName,
        dob,
        aadharNumber,
        phoneNumber,
        userName,
        password,
        joinedOn,
        location,
        profilePicture,
        profileDescription,
        noOfPosts,
        postsOrComments,
        blockedUsers,
    } = req.body

    const profile = await Profile.findById(req.params.id)

    if(profile){
        profile.firstName = firstName,
        profile.lastName = lastName,
        profile.dob = dob,
        profile.aadharNumber = aadharNumber,
        profile.phoneNumber = phoneNumber,
        profile.userName = userName,
        profile.password = password,
        profile.joinedOn = joinedOn,
        profile.location = location,
        profile.profilePicture = profilePicture,
        profile.profileDescription = profileDescription,
        profile.noOfPosts = noOfPosts,
        profile.postsOrComments = postsOrComments,
        profile.blockedUsers = blockedUsers,
        profile.profilePic = profilePic,
        profile.profilePicType = profilePicType

        const updatedProfile = await profile.save()
        res.json(updatedProfile)
    }else{
        res.status(404)
        throw new Error('Profile not found')
    }
});


//delete profile
const deleteProfile = asyncHandler(async (req, res) => {
    try {
        const result = await Profile.deleteOne({ _id: req.params.id });
        
        if (result.deletedCount === 1) {
            res.json({ message: 'Profile removed' });
        } else {
            res.status(404).json({ error: 'Profile not found' });
        }
    } catch (error) {
        console.error('Error deleting profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//delete all profiles
const deleteAllProfiles = asyncHandler(async (req, res) => {
    try {
        const result = await Profile.deleteMany({});
        
        if (result.deletedCount > 0) {
            res.json({ message: `${result.deletedCount} profiles removed` });
        } else {
            res.json({ message: 'No profiles found' });
        }
    } catch (error) {
        console.error('Error deleting profiles:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



module.exports= {
    getProfiles,
    getProfileById,
    getProfileByUsername,
    createProfile,
    updateProfile,
    deleteProfile,
    deleteAllProfiles
}
