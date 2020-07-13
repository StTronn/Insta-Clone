import Sequelize from "sequelize";

const sequelize = new Sequelize("test1", "postgres", "rishav2000", {
  dialect: "postgres",
});

const models = {
  User: sequelize.import("./user"),
  Comment: sequelize.import("./comment"),
  Post: sequelize.import("./post"),
  Like: sequelize.import("./like"),
  Follow: sequelize.import("./follow"),
  sequelize,
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

//hooks
models.Follow.beforeCreate(async (follow, options) => {
  const user = await models.User.findOne({ where: { id: follow.userId } });
  const follower = await models.User.findOne({
    where: { id: follow.followerId },
  });
  user.followersCount += 1;
  follower.followingCount += 1;
  await user.save();
  await follower.save();
});

models.Post.beforeCreate(async (post, options) => {
  const user = await models.User.findOne({ where: { id: post.userId } });
  user.postCount += 1;
  await user.save();
});

models.Like.beforeCreate(async (like, options) => {
  const post = await models.Post.findOne({ where: { id: like.postId } });
  post.likesCount += 1;
  await post.save();
});
export { sequelize };

export default models;
