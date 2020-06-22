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
    Message.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
        foreignKey: "userId",
      },
    });
  };

  return Message;
};

export default message;
