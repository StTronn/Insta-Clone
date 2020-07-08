const follow = (sequelize, DataTypes) => {
  const Follow = sequelize.define("follow", {
    userId: {
      type: DataTypes.STRING,
    },

    followerId: {
      type: DataTypes.STRING,
    },
  });

  return Follow;
};

export default follow;
