const router = require("express").Router();
const sequelize = require("../config/connection");

const { User, Post, Comment } = require("../models");

// Get all posts
router.get("/", async (req, res) => {
  try {
    const allPosts = await Post.findAll({
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
    //res.status(200).json(allPosts);
    res.render("home");
  } catch (error) {
    console.log(error);
    res.status(500).json("Error retrieving all posts data from database.");
  }
});

// Get one post

// router.get("/:id", async (req, res) => {
//   try {
//     const allPosts = await Post.findByPk(req.params.id, {
//       attributes: ["id", "title", "content", "created_at"],
//       include: [
//         {
//           model: Comment,
//           attributes: [
//             "id",
//             "comment_text",
//             "post_id",
//             "user_id",
//             "created_at",
//           ],
//           include: {
//             model: User,
//             attributes: ["username"],
//           },
//         },
//         {
//           model: User,
//           attributes: ["username"],
//         },
//       ],
//     });
//     if (!allPosts) {
//       res.status(404).json("No post with this ID in the database");
//       return;
//     }
//     res.status(200).json(allPosts);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json("Error retrieving post data from database.");
//   }
// });

// Add login and sign-up
//Send the sign up page
router.get("/signup", async (req, res) => {
  try {
    res.render("signup");
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Error rendering sign-up.");
  }
});

// Send the login page
router.get("/login", async (req, res) => {
  try {
    res.render("login");

    if (req.session.loggedIn) {
      res.redirect("/dasboard");
      return;
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Error rendering login.");
  }
});

module.exports = router;
