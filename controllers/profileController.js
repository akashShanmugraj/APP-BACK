import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import Profile from '../schemas/profileSchema.js'
import bcrypt from 'bcrypt'

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
    const {
        name,
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
        profilePic,
        profilePicType
    } = req.body;

    if (!dob || !name || !aadharNumber || !userName || !password || !joinedOn || !location) {
        res.status(400).json({ message: 'Please provide all required fields' });
        return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);

    const profile = new Profile({
        name,
        dateOfBirth: dob,  // Adjust this field to match your schema
        aadharNumber,
        phoneNumber,
        userName,
        password: hashed_password,
        joinedOn,
        location,
        profilePicture,
        profileDescription,
        noOfPosts,
        postsOrComments,
        blockedUsers,
        profilePic,
        profilePicType
    });

    try {
        const createdProfile = await profile.save();
        res.status(201).json(createdProfile);
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
        profilePic,
        profilePicType
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
    const profile = await Profile.findById(req.params.id)

    if(profile){
        await profile.remove()
        res.json({message: 'Profile removed'})
    }else{
        res.status(404)
        throw new Error('Profile not found')
    }
}
);

export {
    getProfiles,
    getProfileById,
    getProfileByUsername,
    createProfile,
    updateProfile,
    deleteProfile
}
