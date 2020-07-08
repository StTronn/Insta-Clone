import { Router } from "express";

const router = Router();

router.get("/:username", async (req, res, next) => {
  try {
    const username = req.params.username;
    console.log(username);
    const models = req.context.models;
    const user = await models.User.findOne({
      where: { username },
    });
    console.log(user);
    if (!user) {
      const err = new Error("not user with given username");
      err.statusCode = 404;
      throw err;
    }
    res.send(user);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

export default router;
