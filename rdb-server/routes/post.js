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

router.get("/p/:postId", async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postId);
    const models = req.context.models;
    const post = await models.Post.findOne({
      where: { id: postId },
      include: [
        { model: models.Comment, include: [models.User] },
        { model: models.User },
      ],
    });
    console.log(post);
    res.send(post);
  } catch (err) {
    console.log(err);
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

router.get("/toggleLike/:postId", protect, async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postId);
    const models = req.context.models;
    const user = req.context.user;
    const post = await models.Post.findOne({
      where: { id: postId },
    });
    if (!post) throw new Error("cannot find the post to ");
    const like = await models.Like.findOne({
      where: { userId: user.id, postId },
    });
    //check for like if not found
    if (!like) await models.Like.create({ userId: user.id, postId });
    else await like.destroy();
    //else delete
    res.send({ message: "like" });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

//note outside the server the message is refered to as a comment
//comment to a given post
//todo add post in path
router.post("/comment/:postId", protect, async (req, res, next) => {
  try {
    const models = req.context.models;
    const postId = parseInt(req.params.postId);
    let { text } = req.body;
    const user = req.context.user;
    const comment = await models.Comment.create({
      text,
      postId,
      userId: user.id,
    });
    let retComment = comment.toJSON();
    retComment.user = user;
    res.send({ comment: retComment, message: "comment added" });
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
