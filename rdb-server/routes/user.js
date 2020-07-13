import { Router } from "express";

const router = Router();

router.get("/:username", async (req, res, next) => {
  try {
    const username = req.params.username;
    const models = req.context.models;
    const user = await models.User.findOne({
      where: { username },
    });
    if (!user) {
      const err = new Error("not user with given username");
      err.statusCode = 404;
      throw err;
    }
    const posts = await models.Post.findAll({ where: { userId: user.id } });
    const retUser = user.toJSON();
    retUser.posts = posts;

    res.send(retUser);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post("/follows", async (req, res, next) => {
  try {
    const { userId, followerId } = req.body;
    const models = req.context.models;
    const follows = await models.Follow.findOne({
      where: { userId, followerId },
    });
    if (!follows) res.send({ follows: false });
    else res.send({ follows: true });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

export default router;
