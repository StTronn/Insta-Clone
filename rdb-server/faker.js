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
  await models.Post.create({
    title: "last of us II",
    content: "seriously what's with the hype",
    userId: 1,
  });

  await models.Follow.create({
    userId: 1,
    followerId: 2,
  });

  await models.Like.create({
    userId: 1,
    postId: 1,
  });
  await models.Like.create({
    userId: 2,
    postId: 1,
  });

  await models.Comment.create({
    text: "true af",
    postId: 1,
    userId: 2,
  });
};

export default insertFakedata;
