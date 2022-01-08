const router = require("express").Router();

const { User, Post, Comment } = require("../../models");

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
