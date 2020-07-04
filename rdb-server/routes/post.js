import { Router } from "express";
import protect from "../middleware/auth";

const router = Router();

//create post,comment +
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

//get all post by user
router.get("/", protect, async (req, res, next) => {
  try {
    const models = req.context.models;
    const user = req.context.user;
    const posts = await models.Post.findAll({ where: { userId: user.id } });
    res.send({ posts });
  } catch (err) {
    next(err);
  }
});

router.get("/all", async (req, res, next) => {
  try {
    const models = req.context.models;
    const posts = await models.Post.findAll({ order: [["createdAt", "DESC"]] });
    res.send({ posts });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

//edit post
router.get("/updatePost", protect, async (req, res, next) => {
  try {
    const models = req.context.models;
    let { title, content, postId } = req.body;
    if (!title) throw new Error("cannot update post with empty title");
    content = content || "";

    const post = await models.Post.findOne({ where: { id: postId } });
    post.title = title;
    post.content = content;
    post.save();
    res.send({ post, message: "post updated" });
  } catch (err) {
    next(err);
  }
});

//delete post of user
router.get("/delete/:postId", protect, async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postId);
    const models = req.context.models;
    const user = req.context.user;
    const post = await models.Post.findOne({
      where: { userId: user.id, id: postId },
    });
    if (!post)
      throw new Error(
        "cannot find the post to delete or the user dosen't have the permission"
      );
    await post.destroy();
    res.send({ message: "post deleted succesfully" });
  } catch (err) {
    next(err);
  }
});

router.get("/vote/:postId", protect, async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postId);
    const models = req.context.models;
    const user = req.context.user;
    const post = await models.Post.findOne({
      where: { id: postId },
    });
    if (!post) throw new Error("cannot find the post to ");
    const vote = await models.Vote.findOne({
      where: { userId: user.id, postId },
    });
    //check for vote if not found
    if (!vote) await models.Vote.create({ userId: user.id, postId });
    else await vote.destroy();
    //else delete
    res.send({ message: "voted" });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

//note outside the server the message is refered to as a comment
//comment to a given post
//todo add post in path
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
    res.send({ comment: message, message: "comment added" });
  } catch (err) {
    next(err);
  }
});

//permalink of post
router.get("/:postId", protect, async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postId);
    const models = req.context.models;
    const post = await models.Post.findOne({
      where: { id: postId },
    });
    if (!post) throw new Error("cannot find the post ");
    res.send({ post });
  } catch (err) {
    next(err);
  }
});

export default router;