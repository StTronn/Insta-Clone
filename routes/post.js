import { Router } from "express";
import protect from "../middleware/auth";

const router = Router();

//create post
//get post of all user
//get all post sorted by date created
router.post("/", protect, async (req, res, next) => {
  try {
    const models = req.context.models;
    let { title, content } = req.body;
    if (!title) throw new Error("cannot create a post with empty title");
    content = content || "";

    const user = req.context.user;
    const post = await models.Post.create({
      title,
      content,
      userId: user.id,
    });
    res.send({ post, message: "post created" });
  } catch (err) {
    next(err);
  }
});

//note outside the server the message is refered to as a comment
router.post("/comment", protect, async (req, res, next) => {
  try {
    const models = req.context.models;
    let { text, postId } = req.body;
    const user = req.context.user;
    const message = await models.Message.create({
      text,
      postId,
      userId: user.id,
    });
    res.send({ comment, message: "comment added" });
  } catch (err) {
    next(err);
  }
});

export default router;
