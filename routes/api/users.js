//Bring in express Router
const express = require("express");
const router = express.Router();

//We need a name , email and password so we need to use express validator
const { check, validationResult } = require("express-validator/check");

//@route POST api/users
//@desc Register user
//@access Public
router.post(
  "/",
  [
    check("name", " Name is required").not().isEmpty(),

    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    //to handle with the response
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //if not errors
      return res.status(400).json({ errors: errors.array() }); //return us status (ideal : 400)
    }
    res.send("User route");
  }
);

//exports
module.exports = router;
