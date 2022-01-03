const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

// Get all users without their passwords
router.get("/", async (req, res) => {
  try {
    const allUsers = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
    });
    res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error retrieving all users data from database.");
  }
});

// Get one user without their password
router.get("/:id", async (req, res) => {
  try {
    const allUsers = await User.findByPk(req.params.id, {
      attributes: {
        exclude: ["password"],
      },
    });
    res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error retrieving user's data from database.");
  }
});

// Create user

module.exports = router;
