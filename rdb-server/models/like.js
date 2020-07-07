const like = (sequelize, DataTypes) => {
  const Like = sequelize.define("like", {
    userId: {
      type: DataTypes.STRING,
    },

    postId: {
      type: DataTypes.STRING,
    },
  });

  return Like;
};

export default like;
