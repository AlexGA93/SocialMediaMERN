//Bring in express Router
const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

const User = require("../../models/User"); //Schema
//@route GET api/auth
//@desc Test route
//@access Public
router.get("/", auth, async (req, res) => {
  //we want to recieve the user's data
  try {
    const user = await User.findById(req.user.id) //we put req. user because we put that it had the user decoded with its ID
      .select("-password"); //we don't want to show password

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//exports
module.exports = router;
