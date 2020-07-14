//Bring in express Router
const express = require("express");
const router = express.Router();

//@route GET api/profile
//@desc Test route
//@access Public
router.get("/", (req, res) => res.send("Profile route"));

//exports
module.exports = router;
