const { Comment } = require("../models");

const commentData = [
  {
    comment_text: "Love this!",
    post_id: 1,
    user_id: 1,
  },
  {
    comment_text: "Inspirational.",
    post_id: 2,
    user_id: 2,
  },
  {
    comment_text: "Nice.",
    post_id: 3,
    user_id: 3,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
