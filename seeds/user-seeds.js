const { User } = require("../models");

const userData = [
  {
    username: "Julia",
    password: "roberts321",
  },
  {
    username: "Clint",
    password: "eastwood654",
  },
  {
    username: "Meryl",
    password: "streep987",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
