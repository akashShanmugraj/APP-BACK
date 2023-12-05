import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import Profile from '../schemas/profileSchema.js'
import bcrypt from 'bcryptjs'

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
    password_to_hash = req.body.password.encode('utf-8')
    const salt = bcrypt.genSaltSync(10)
    hashed_password = bcrypt.hashSync(password_to_hash, salt)
    
    const profile = new Profile({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob,
        aadharNumber: req.body.aadharNumber,
        phoneNumber: req.body.phoneNumber,
        userName: req.body.userName,
        password: hashed_password,
        joinedOn: req.body.joinedOn,
        location: req.body.location,
        profilePicture: req.body.profilePicture,
        profileDescription: req.body.profileDescription,
        noOfPosts: req.body.noOfPosts,
        postsOrComments: req.body.postsOrComments,
        blockedUsers: req.body.blockedUsers,
        profilePic: req.body.profilePic,
        profilePicType: req.body.profilePicType
    })

    const createdProfile = await profile.save()
    res.status(201).json(createdProfile)
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
