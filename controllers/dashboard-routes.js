const router = require("express").Router();
const sequelize = require("../config/connection");

const { User, Post, Comment } = require("../models");
const { post } = require("./home-routes");
const withAuth = require("../utils/auth");
const { restore } = require("../models/Post");

// find all users posts
router.get("/", async (req, res) => {
  if (req.session && req.session.loggedIn) {
    try {
      const allPosts = await Post.findAll({
        // where: {
        //   user_id: req.session.user_id,
        // },
        attributes: ["id", "title", "content", "created_at"],
        order: [["created_at", "DESC"]],
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
      res.render("dashboard", { posts });
    } catch (error) {
      console.log(error);
      res.status(500).json("Error retrieving posts data from database.");
    }
  } else {
    res.redirect("/login");
  }
});

// Add (create) post
router.get("/post/new", async (req, res) => {
  res.render("newpost", {
    loggedIn: true,
  });
});

// Edit post
router.get("/post/edit/:id", async (req, res) => {
  // Retrieve the current post content
  try {
    const currPost = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "title", "content", "created_at"],
      include: [User],
    });
    res.render("editpost", {
      post: currPost.get({ plain: true }),
      loggedIn: true,
    });
  } catch (error) {
    console.log(error);
    res.render("editpost", {
      error: "Something went wrong while retrieving the post",
    });
  }
});

// get one of user's posts
router.get("/post/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
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
    console.log(post.get({ plain: true }));
    res.render("single-post", { post: post.get({ plain: true }) });
  } catch (error) {
    console.log(error);
    res.status(500).json("Error retrieving post data from database.");
  }
});

// Find one of user's comments
router.get("/comment/:id", async (req, res) => {
  try {
    const allComments = await Comment.findOne({
      // where: {
      //   user_id: req.session.user_id,
      // },
      attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
      order: [["created_at", "DESC"]],
      include: [
        {
          model: Post,
          attributes: ["id", "title", "content", "created_at"],
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
    res.render("dashboard");
  } catch (error) {
    console.log(error);
    res.status(500).json("Error retrieving comment data from database.");
  }
});

// Edit (update) comment
router.put("/comment/edit/:id", async (req, res) => {
  try {
    const data = await Comment.findByPk(req.params.id);
    const comment = data.get({ plain: true });
    // response
    res.render("dashboard", comment);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error retrieving comment data from database.");
  }
});

// Delete comment
router.delete("/comment/:id", async (req, res) => {
  try {
    await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
