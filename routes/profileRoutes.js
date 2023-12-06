const express = require("express");
const profileController = require("../controllers/profileController.js");

const {
  getProfiles,
  getProfileById,
  getProfileByUsername,
  createProfile,
  updateProfile,
  deleteProfile,
} = profileController;


const router = express.Router();


router.get("/",getProfiles);
router.get("/:id",getProfileById);
router.get("/:username",getProfileByUsername);
router.post("/",createProfile);
router.put("/:id",updateProfile);
router.delete("/:id",deleteProfile);

module.exports = router;