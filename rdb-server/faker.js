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
};

export default insertFakedata;
