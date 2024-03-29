"use strict";

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const config = require("../config");
const { camelCase, upperFirst } = require("lodash");
const db = {};

let sequelize = new Sequelize(
  config.db.name,
  config.db.username,
  config.db.password,
  {
    host: config.db.host,
    dialect: "mysql",
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log(chalk.blue("Database connection established successfully."));
  })
  .catch((err) => {
    console.error(chalk.red("Unable to connect to the database:"), err);
  });

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    let name = upperFirst(camelCase(model.name));
    db[name] = model;
  });
sequelize.sync({
  alter: true,
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
