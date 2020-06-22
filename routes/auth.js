import { Router } from "express";
import bcrypt from "bcrypt";
const router = Router();

const saltRounds = 10;

router.post("/register", async (req, res) => {
  let models = req.context.models;
  let resObj = {};
  try {
    let { username, email, password } = req.body;

    if (username && email && password) {
      //check for username
      let userWithUsername = await models.User.findOne({
        where: { username },
      });
      if (userWithUsername) {
        resObj = {
          user: {},
          response: "ERROR",
          message: "username is taken",
          error: "",
        };
      }
      let userWithEmail = await models.User.findOne({
        where: { email },
      });
      //check for email
      if (!userWithUsername && userWithEmail) {
        resObj = {
          user: {},
          response: "ERROR",
          message: "a account with email already exists",
          error: "",
        };
      }
      //register
      if (!userWithUsername && !userWithEmail) {
        const hashPassword = await bcrypt.hash(password, saltRounds);
        const user = await models.User.create({
          username,
          email,
          password: hashPassword,
        });
        resObj = { user, response: "OK", message: "user created", error: "" };
      }
    } else {
      resObj = {
        user: {},
        response: "ERROR",
        message: "not enough details",
        error: "not enough details",
      };
    }
    res.send(resObj);
  } catch (err) {
    console.log(err);
    resObj = {
      user: {},
      response: "ERROR",
      message: "",
      error: "cannot create user in database",
    };
    res.send(resObj);
  }
});

export default router;
