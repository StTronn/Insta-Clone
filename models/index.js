import Sequelize from "sequelize";

const sequelize = new Sequelize("test1", "postgres", "rishav2000", {
  dialect: "postgres",
});

const models = {
  User: sequelize.import("./user"),
  Message: sequelize.import("./message"),
  Post: sequelize.import("./post"),
  Vote: sequelize.import("./vote"),
  sequelize,
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
