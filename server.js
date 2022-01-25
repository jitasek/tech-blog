const express = require("express");
const path = require("path");
const session = require("express-session");
const exphbs = require("express-handlebars");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store); // to store session in mySQL
const routes = require("./controllers");
const helpers = require("./utils/helpers");

const app = express();
const hbs = exphbs.create({ helpers }); // creates new handlebars instance for my server
const PORT = process.env.PORT || 3000;

const sess = {
  secret: "secret value",
  resave: false,
  cookie: {
    maxAge: 10 * 60 * 1000,
  },
  saveUninitialized: true,
  /*store: new SequelizeStore({
    db: sequelize,
  }),*/
};

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
