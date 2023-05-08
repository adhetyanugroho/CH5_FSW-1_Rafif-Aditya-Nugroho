"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Cars", {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        // type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      size: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        }
      },
      updatedBy: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        }
      },
      deletedBy: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Cars");
  },
};
