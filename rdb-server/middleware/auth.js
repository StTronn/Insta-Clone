import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
  let models = req.context.models;
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const data = jwt.verify(token, process.env.JWT_KEY);
    const user = await models.User.findOne({ where: { token } });
    if (!user) throw new Error("Not authorized to access this resource");

    req.context.user = user;
    console.log("me next");
    if (user) next();
  } catch (error) {
    res.status(401).send({ error: "Not authorized to access this resource" });
  }
};

export default protect;
