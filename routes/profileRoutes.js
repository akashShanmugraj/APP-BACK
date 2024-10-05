const express = require("express");
const profileController = require("../controllers/profileController.js");
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const {
  getProfiles,
  getProfileById,
  getProfileByUsername,
  createProfile,
  updateProfile,
  deleteProfile,
  deleteAllProfiles
} = profileController;


const router = express.Router();


router.get("/",getProfiles);
router.get("/:id",getProfileById);
router.get("/username/:username",getProfileByUsername);
router.post("/", upload.single('profilePicture'), createProfile);
router.put("/:id",updateProfile);
router.delete("/:id",deleteProfile);
router.delete("/",deleteAllProfiles);

module.exports = router;