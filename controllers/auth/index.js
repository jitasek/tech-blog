const router = require("express").Router();
const beforeCreate = require("../../hooks/index");

const { User, Post, Comment } = require("../../models");

// router.get("/logout", (req, res) => {
//   if (req.session && req.session.loggedIn) {
//     req.session.destroy(() => {
//       res.status(200).render("login");
//     });
//   } else {
//     res.status(404).end();
//   }
// });

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
      req.session.userId = user.id;
      req.session.username = user.username;
      return res
        .status(200)
        .json({ user: user, message: "You are logged in!" });
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Login failed." });
  }
});

router.post("/signup", async (req, res) => {
  try {
    if (req.body.username && req.body.password) {
      await User.create({
        username: req.body.username,
        password: req.body.password,
      });
      return res.status(200).json({ data: "success" });
    }

    return res.status(400).json({ error: "Failed to create user." });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Failed to create user." });
  }
});

module.exports = router;
