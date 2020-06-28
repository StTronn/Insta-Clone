const post = (sequelize, DataTypes) => {
  const Post = sequelize.define("post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  Post.associate = (models) => {
    Post.hasMany(models.Message, { onDelete: "CASCADE" });
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
        foreignKey: "userId",
      },
    });
  };

  return Post;
};

export default post;
