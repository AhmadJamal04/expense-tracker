"use strict";
const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define("expenses", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      user_id:{
    type:DataTypes.INTEGER,
    allowNull:false
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false
      },
   
    createdAt: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.INTEGER,
      timestamps: false
    },
  });

  Expense.beforeCreate(async (expense) => {
    expense.dataValues.createdAt = moment().unix();
    expense.dataValues.updatedAt = moment().unix();
  });
  Expense.beforeUpdate(async (expense) => {
    expense.dataValues.updatedAt = moment().unix();
  });
Expense.associate=function(models){
  Expense.belongsTo(models.Users,{foreignKey:"user_id"})
}
  return Expense;
};