//Bring in express Router
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
//models
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

//@route POST api/posts
//@desc Create a post
//@access Private
router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.body.user,
      });
      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
//@route GET api/posts
//@desc Get all posts
//@access Private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find(req.params.id).sort({ data: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
//@route GET api/posts/:id
//@desc Get all posts by ID
//@access Private
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    if (err.kinf == "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

//@route DELETE api/posts/:id
//@desc Delete a post
//@access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //Check user
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    git;

    await post.remove();
    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kinf == "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

//@route PUT api/posts/like/:id
//@desc Like a post
//@access Private
router.put("/like/:id", auth, async (req, res) => {
  //technycally it's updating a post by it ID
  try {
    //Post model array
    const post = await Post.findById(req.params.id);

    //check if the post has been already liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).lenght > 
      0
    ) {
      return res.status(404).json({ msg: "Post already liked" });
    }
    //console.log(post);
    post.likes.unshift({ user: req.user.id }); //adds new items to the beginning of an array
    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route PUT api/posts/unlike/:id
//@desc Like a post
//@access Private
router.put("/unlike/:id", auth, async (req, res) => {
  //technycally it's updating a post by it ID
  try {
    //Post model array
    const post = await Post.findById(req.params.id);

    //check if the post has been already liked
    if (
      (post.likes.filter(
        (like) => like.user.toString() === req.user.id
      ).lenght = 0) 
    ) {
      return res.status(404).json({ msg: "Post has not yet been liked" });
    }

    //Get remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
//exports
module.exports = router;
