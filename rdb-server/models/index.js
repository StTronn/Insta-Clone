import Sequelize from "sequelize";

const sequelize = new Sequelize("test1", "postgres", "rishav2000", {
  dialect: "postgres",
});

const models = {
  User: sequelize.import("./user"),
  Comment: sequelize.import("./comment"),
  Post: sequelize.import("./post"),
  Like: sequelize.import("./like"),
  sequelize,
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
