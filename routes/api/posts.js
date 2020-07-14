//Bring in express Router
const express = require("express");
const router = express.Router();

//@route GET api/posts
//@desc Test route
//@access Public
router.get("/", (req, res) => res.send("Posts route"));

//exports
module.exports = router;
