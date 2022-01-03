const router = require("express").Router();

const { User, Post, Comment } = require("../../models");

// Get all posts
router.get("/", async (req, res) => {
  try {
    const allPosts = await Post.findAll({
      attributes: ["id", "title", "content", "created_at"],
      order: [["created_at", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
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
      ],
    });
    res.status(200).json(allPosts);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error retrieving all posts data from database.");
  }
});

// Get one post
router.get("/:id", async (req, res) => {
  try {
    const allPosts = await Post.findByPk(req.params.id, {
      attributes: ["id", "title", "content", "created_at"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
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
      ],
    });
    if (!allPosts) {
      res.status(404).json("No post with this ID in the database");
      return;
    }
    res.status(200).json(allPosts);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error retrieving post data from database.");
  }
});

// Create post

// Update post

// Delete post

module.exports = router;
