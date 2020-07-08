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
    postCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    followersCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    followingCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
    bio: {
      type: DataTypes.STRING,
    },
    token: {
      type: DataTypes.STRING,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Post, { onDelete: "CASCADE" });
    User.hasMany(models.Comment, { onDelete: "CASCADE" });
    User.belongsToMany(models.Post, {
      through: models.Like,
      foreignKey: {
        name: "userId",
      },
    });

    User.belongsToMany(models.User, {
      through: models.Follow,
      as: "userId",
      foreignKey: {
        name: "userId",
      },
    });
    User.belongsToMany(models.User, {
      through: models.Follow,
      as: "followerId",
      foreignKey: {
        name: "followerId",
      },
    });
  };

  return User;
};

export default user;
