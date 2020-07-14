//Bring in express Router
const express = require("express");
const router = express.Router();

//@route GET api/users
//@desc Test route
//@access Public
router.get("/", (req, res) => res.send("User route"));

//exports
module.exports = router;
