//Bring in express Router
const express = require("express");
const router = express.Router();

//gravatar's packet
const gravatar = require("gravatar");

//bcrypt
const bcrypt = require("bcryptjs");

//We need a name , email and password so we need to use express validator
const { check, validationResult } = require("express-validator");

//User model
const User = require("../../models/User");

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
  async (req, res) => {
    //'async' ==>  function always returns a promise
    //to handle with the response
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //if not errors
      return res.status(400).json({ errors: errors.array() }); //return us status (ideal : 400)
    }

    const { name, email, password } = req.body;
    try {
      //See if User exists
      let user = await User.findOne({ email }); //'await' ==> Javascript wait until that promise settles and return its result

      if (user) {
        res.status(400).json({ errors: [{ msg: "User already exists" }] });
      }
      //Get uses Gravatar
      const avatar = gravatar.url(email, {
        s: "200", //size
        r: "pg", // rating ( We don't want any inapropiated photo, don't you think? )
        d: "mm", //default image icon
      });
      //user's instance
      user = new User({
        name,
        email,
        avatar,
        password,
      });
      //Encrypt passwords using 'bcrypt'
      const salt = await bcrypt.genSalt(10); //To generate Salt to the Hash method
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      //Return jsonwebtoken (JWT)

      res.send("User registered");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error"); //message sent if there's an error and status responsed
    }
  }
);

//exports
module.exports = router;
