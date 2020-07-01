const vote = (sequelize, DataTypes) => {
  const Vote = sequelize.define("vote", {
    userId: {
      type: DataTypes.STRING,
    },

    postId: {
      type: DataTypes.STRING,
    },
  });

  Vote.associate = (models) => {};

  return Vote;
};

export default vote;
