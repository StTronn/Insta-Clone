const comment = (sequelize, DataTypes) => {
  const Comment = sequelize.define("comment", {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false,
        foreignKey: "parentId",
      },
    });
    Comment.belongsTo(models.User, {
      foreignKey: {
        foreignKey: "UserId",
      },
    });
  };

  return Comment;
};

export default comment;
