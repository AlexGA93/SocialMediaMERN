//Bring in express Router
const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

const { check, validationResult } = require("express-validator");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

//@route GET api/profile/me
//@desc Get current user's profile
//@access Private
router.get("/me", auth, async (req, res) => {
  //protected route
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]); //populate with the name of the user and the avatar (User model)

    //check if there isn't profile
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.json(profile); //if there is profile, convert it to json
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route POST api/profile
//@desc Create or update user profile
//@access Private
router.post(
  "/",
  [
    auth,
    [
      //fields that we want to be required to check
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skills is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Pulling fields out
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;
    ///////////////////////////////////////////////////////////////////////////
    //Build profile object
    const profileFields = {};

    profileFields.user = req.user.id; //putting user from the user;s request
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;

    //turn it into an array like our Schema
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }
    ///////////////////////////////////////////////////////////////////////////
    //Build social object
    profileFields.social = {};
    if (youtube) profileFields.youtube = youtube;
    if (facebook) profileFields.facebook = facebook;
    if (twitter) profileFields.twitter = twitter;
    if (instagram) profileFields.instagram = instagram;
    if (linkedin) profileFields.linkedin = linkedin;

    try {
      let profile = await Profile.findOne({ user: req.user.id }); //create profile instance
      if (profile) {
        //check if there's profile
        //Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      //Create
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route GET api/profile/
//@desc Get all profiles
//@access Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route GET api/profile/user/user_id
//@desc Get profile by user ID
//@access Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) return res.status(400).json({ msg: "Profile not found" });
    res.send(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});

//@route DELETE api/profile/
//@desc Delete profile, user & posts
//@access Private
router.delete("/", auth, async (req, res) => {
  try {
    //@todo - remove users posts

    //Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });

    //Remove User
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//exports
module.exports = router;
