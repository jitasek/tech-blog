const seedUsers = require("./user-seeds");
//const User = require("../models/User");
const sequelize = require("../config/connection");
const seedPosts = require("./post-seeds");

// const createUsers = async (seedUsers) => {
//   return await User.bulkCreate(seedUsers);
// };

const seed = async () => {
  await sequelize.sync({ force: true });
  // Create users
  await seedUsers();
  await seedPosts();

  await sequelize.close();
};

seed();
