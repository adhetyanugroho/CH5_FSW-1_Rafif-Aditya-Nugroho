"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'createdBy',
      });
      this.belongsTo(models.User, {
        foreignKey: 'updatedBy',
      });
      this.belongsTo(models.User, {
        foreignKey: 'deletedBy',
      });
    }
  }
  Cars.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.TEXT,
      size: DataTypes.STRING,
      image: DataTypes.STRING,
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: "id"
        }
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'User',
          key: "id"
        }
      },
      deletedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'User',
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
