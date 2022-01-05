const router = require("express").Router();
const sequelize = require("../config/connection");

const { User, Post, Comment } = require("../models");
const { post } = require("./home-routes");
const withAuth = require("../utils/auth");

// find all users posts
router.get("/", async (req, res) => {
  try {
    const allPosts = await Post.findAll({
      // where: {
      //   user_id: req.session.user_id,
      // },
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
    // response
    const posts = allPosts.map((post) => post.get({ plain: true }));
    // res.render("dashboard", { posts, loggedIn: true });
    res.render("dashboard");
  } catch (error) {
    console.log(error);
    res.status(500).json("Error retrieving posts data from database.");
  }
});

// get one of user's post
router.get("/post/:id", async (req, res) => {
  try {
    const allPosts = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "title", "content", "created_at"],
    });
  } catch (error) {}
});

// Edit (update) post

// Delete post

// Get all comments

// Get one comment

// Edit (update) comment

// Delete comment

module.exports = router;
