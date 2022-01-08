const express = require("express");
const sequelize = require("./config/connection");
const routes = require("./controllers");
const path = require("path");
const helpers = require("./utils/helpers");
const exphbs = require("express-handlebars");
const session = require("express-session");
const { urlencoded } = require("express");
const SequelizeStore = require("connect-session-sequelize")(session.Store); // to store session in mySQL

const hbs = exphbs.create({ helpers }); // creates new handlebars instance for my server
const app = express();
const PORT = process.env.PORT || 3000;

const sess = {
  secret: "secret value",
  cookie: {
    maxAge: 600000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
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
