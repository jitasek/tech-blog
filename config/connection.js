const { Sequelize } = require("sequelize");
require("dotenv").config();

const dbOptions = {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
};

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

let sequelize;
if (process.env.JAWSDB_URL) {
  console.log("Using JAWSDB");
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(dbName, dbUser, dbPassword, dbOptions);
}

module.exports = sequelize;
