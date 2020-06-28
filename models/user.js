const user = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isAlphanumeric: {
          args: true,
          msg: "The username can only contain letters and numbers",
        },
        len: {
          args: [3, 25],
          msg: "The username needs to be between 3 and 25 characters long",
        },
      },
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "Invalid email",
        },
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    token: {
      type: DataTypes.STRING,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Post, { onDelete: "CASCADE" });
    User.hasMany(models.Message, { onDelete: "CASCADE" });
  };

  return User;
};

export default user;
