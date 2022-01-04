const router = require("express").Router();

const { User, Post, Comment } = require("../../models");

// Get all comments
router.get("/", async (req, res) => {
  try {
    const allComments = await Comment.findAll({
      attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
      order: [["created_at", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Post,
          attributes: ["id", "title", "content", "created_at"],
        },
      ],
    });
    res.status(200).json(allComments);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error retrieving all comments data from database.");
  }
});

// Get one comment
router.get("/:id", async (req, res) => {
  try {
    const allComments = await Comment.findByPk(req.params.id, {
      attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Post,
          attributes: ["id", "title", "content", "created_at"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });
    if (!allComments) {
      res.status(404).json("No comment with this ID in the database");
      return;
    }
    res.status(200).json(allComments);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error retrieving comment data from database.");
  }
});

// Create comment

// Update comment

// Delete comment

module.exports = router;
