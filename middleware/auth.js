import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const data = jwt.verify(token, process.env.JWT_KEY);
    req.context.userId = data.id;
    console.log("me next");
    if (data) next();
  } catch (error) {
    res.status(401).send({ error: "Not authorized to access this resource" });
  }
};

export default protect;
