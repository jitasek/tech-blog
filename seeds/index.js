const seedUsers = require("./user-seeds");
//const User = require("../models/User");
const sequelize = require("../config/connection");
const seedPosts = require("./post-seeds");
const seedComments = require("./comment-seeds");

// const createUsers = async (seedUsers) => {
//   return await User.bulkCreate(seedUsers);
// };

const seed = async () => {
  try {
    await sequelize.sync({ force: true });
    // Create users, posts, comments
    await seedUsers();
    await seedPosts();
    await seedComments();

    await sequelize.close();
  } catch (error) {
    console.error(error.message);
  }
};

seed();
