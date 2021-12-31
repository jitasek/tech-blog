const express = require("express");
const connection = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3306;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
