import models from "./models";
import bcrypt from "bcrypt";

const insertFakedata = async () => {
  const password = await bcrypt.hash("1", 10);
  await models.User.create({
    username: "tronn",
    name: "rishav thakur",
    bio: "software dev reads and make stuff",
    email: "rishav.21m@gmail.com",
    password,
  });
  await models.User.create({
    username: "follower",
    name: "follower",
    bio: "follows people",
    email: "follows@gmail.com",
    password,
  });
  await models.Post.create({
    title: "jhon wick style",
    content: "killed 2 men in a bar with a frkin pencil",
    userId: 1,
  });
};

export default insertFakedata;
