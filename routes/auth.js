import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { BadRequestError } from "../utils/error";
const router = Router();

const saltRounds = 10;

router.post("/login", async (req, res, next) => {
  let models = req.context.models;
  let resObj = {};
  try {
    //validate user
    let { email, password } = req.body;
    const user = await models.User.findOne({ where: { email } });
    if (!user) {
      const error = new Error(`username and password dosen't match`);
      error.statusCode = 401;
      throw error;
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      const error = new Error(`username and password dosen't match`);
      error.statusCode = 401;
      throw error;
    }
    //sent token and message
    const token = await createToken(user, process.env.JWT_KEY);
    resObj = {
      message: `${user.username} you have succesfully logged in`,
      token,
    };
    return res.send(resObj);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

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
        const error = new Error(`${username} already exists try another`);
        error.statusCode = 409;
        throw error;
      }
      let userWithEmail = await models.User.findOne({
        where: { email },
      });
      //check for email
      if (!userWithUsername && userWithEmail) {
        const error = new Error(
          `there is already an account with the following email try logging in`
        );
        error.statusCode = 409;
        throw error;
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
      next(new BadRequestError());
    }
    res.send(resObj);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

const createToken = async (user, secret) => {
  const token = jwt.sign({ id: user.id }, secret);
  console.log(token);
  return token;
};

export { createToken };

export default router;
