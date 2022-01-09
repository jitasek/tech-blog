const router = require("express").Router();
const sequelize = require("../config/connection");

const { User, Post, Comment } = require("../models");

// Get all posts
router.get("/", async (req, res) => {
  try {
    let allPosts = await Post.findAll({
      attributes: ["id", "title", "content", "created_at"],
      include: [
        {
          model: Comment,
          attributes: [
            "id",
            "comment_text",
            "post_id",
            "user_id",
            "created_at",
          ],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    allPosts = allPosts.map((post) => post.get({ plain: true }));
    res
      .status(200)
      .render("home", { posts: allPosts, loggedIn: req.session.loggedIn });
  } catch (error) {
    console.log(error);
    res.status(500).json("Error retrieving all posts data from database.");
  }
});

// Add login and sign-up:
//Send the sign up page
router.get("/signup", async (req, res) => {
  try {
    res.render("signup");
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Error rendering sign-up.");
  }
});

// Send the login page
router.get("/login", async (req, res) => {
  try {
    res.render("login");

    if (req.session.loggedIn) {
      res.redirect("/dashboard");
      return;
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Error rendering login.");
  }
});

// Logout
router.get("/logout", (req, res) => {
  // If the user is already logged in, redirect to the homepage
  req.session.loggedIn = false;
  delete req.session.userId;
  res.redirect("/");
});

module.exports = router;
