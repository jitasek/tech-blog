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

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    //console.log(user);
    if (!user) {
      // console.info("Incorrect username.");
      res.status(400).json({ message: "Incorrect username or password." });
      return;
    }
    // Check if password is correct
    const validPassword = await user.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password. Please try again!" });
      return;
    }

    // Once user is logged in, set up the session variable "loggedIn", save user data in session
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = user.isSoftDeleted;
      return res
        .status(200)
        .json({ user: user, message: "You are logged in!" });
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Login failed." });
  }
});

// Get one user without their password, include their posts and comments
router.get("/:id", async (req, res) => {
  try {
    const allUsers = await User.findByPk(req.params.id, {
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: Post,
          attributes: ["id", "title", "content", "created_at"],
        },
        {
          model: Comment,
          attributes: ["id", "comment_text", "created_at"],
          include: {
            model: Post,
            attributes: ["title"],
          },
        },
      ],
    });
    if (!allUsers) {
      res.status(404).json("No user with this ID in the database");
      return;
    }
    res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error retrieving user's data from database.");
  }
});

// Create user - in the auth folder

module.exports = router;
