const message = (sequelize, DataTypes) => {
  const Message = sequelize.define("message", {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  Message.associate = (models) => {
    Message.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false,
        foreignKey: "parentId",
      },
    });
    Message.belongsTo(models.User, {
      foreignKey: {
        foreignKey: "UserId",
      },
    });
  };

  return Message;
};

export default message;
