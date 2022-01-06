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
    res.render("dashboard");
  } catch (error) {
    console.log(error);
    res.status(500).json("Error retrieving posts data from database.");
  }
});

// get one of user's posts
router.get("/post/:id", async (req, res) => {
  try {
    const allPosts = await Post.findOne({
      where: {
        id: req.params.id,
      },
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
    res.render("dashboard");
  } catch (error) {
    console.log(error);
    res.status(500).json("Error retrieving post data from database.");
  }
});

// Edit (update) post
router.put("/post/edit/:id", async (req, res) => {
  try {
    const data = await Post.findByPk(req.params.id);
    const post = data.get({ plain: true });
    // response
    res.render("dashboard", post);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error retrieving post data from database.");
  }
});

// Delete post
router.delete("/post/:id", async (req, res) => {
  try {
    await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
  } catch (error) {
    console.error(error.message);
  }
});

// Add (create) post
router.get("/post/new", async (req, res) => {
  res.render("newpost", {
    loggedIn: true,
  });
});

// Find all user's comments
router.get("/", async (req, res) => {
  try {
    const allComments = await Comment.findAll({
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
    const comments = allComments.map((comment) => comment.get({ plain: true }));
    // res.render("dashboard", { comments, loggedIn: true });
    res.render("dashboard");
  } catch (error) {
    console.log(error);
    res.status(500).json("Error retrieving comments data from database.");
  }
});

// Find one of user's comments
router.get("/post/:id", async (req, res) => {
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

// Add(create) comment

module.exports = router;
