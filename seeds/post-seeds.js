const { Post } = require("../models");

const postData = [
  {
    title: "Positive Things To Do In 2022: Practise Mindfulness",
    content:
      "Take time to be more attentive to each new moment as it arises. It is the key to experiencing more peace, connection, and aliveness, regardless of what is going on in your life or what you believe it should look like.",
    user_id: 1,
  },
  {
    title: "Positive Things To Do In 2022: Embrace Change",
    content:
      "Life is not about what happens to us but how we react to it. Keep looking for the good in every moment and learn from the tough ones. This is how we not only survive but thrive: by embracing each moment for what it is and choosing to make the best of it.",
    user_id: 2,
  },
  {
    title: "Positive Things To Do In 2022: Have Faith In Yourself",
    content:
      "Have a little faith in your ability to handle whatever is coming down the road. Believe that you have the strength and resourcefulness required to tackle whatever challenges come your way. And know that you always have the capacity to make the best of anything.",
    user_id: 3,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
