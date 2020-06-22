import express from "express";
const app = express();
const port = 3000;
import models, { sequelize } from "./models";
import auth from "./routes/auth";
const bodyParser = require("body-parser");

const eraseDatabaseOnSync = true;

//middlewares
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.context = {
    models,
    user: {},
  };
  next();
});

app.use("/auth", auth);

app.get("/", (req, res) => res.send("Hello World!"));

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
