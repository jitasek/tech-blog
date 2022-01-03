const router = require("express").Router();

const { User, Post, Comment } = require("../../models");

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    console.log(user);
    if (!user) {
      console.info("User does not exist.");
      return res.status(404).json({ error: "Login failed." });
    }
    // Check if password is correct

    // Save user data in session

    return res.status(200).json({ data: "Logged in successfully." });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Login failed." });
  }
});

router.post("/logout", (req, res) => {
  // if (req.session && req.session.logged_in) {
  //   req.session.destroy(() => {
  //     res.status(204).end();
  //   });
  // } else {
  res.status(404).end();
  // }
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