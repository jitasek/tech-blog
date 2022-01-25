const bcrypt = require("bcrypt");

// Hash password before seeding the db
const beforeBulkCreate = async (users) => {
  const promises = users.map((user) => {
    return bcrypt.hash(user.password, 10);
  });
  // resolve the promises here
  const passwords = await Promise.all(promises);

  // for each user store the hashed password
  passwords.forEach((password, index) => {
    users[index].password = password;
  });
};

// Hash password before every single user is created
const beforeCreate = async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
};

module.exports = { beforeBulkCreate, beforeCreate };
