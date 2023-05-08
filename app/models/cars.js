"use strict";
const { Model, INTEGER } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "createdBy",
      })
    }
  }
  Cars.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      size: DataTypes.STRING,
      image: DataTypes.STRING,
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: "id"
        }
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: "id"
        }
      },
      deletedBy: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: "id"
        }
      }
    },
    {
      sequelize,
      modelName: "Cars",
    }
  );
  return Cars;
};
