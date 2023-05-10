const { Cars } = require("../models");

module.exports = {
  create(createArgs) {
    return Cars.create(createArgs);
  },


  update(id, updatedPost) {
    return Cars.update(updatedPost, {
      where: {
        id: id,
      },
    });
  },


  delete(id, deletedBy) {
    return Cars.destroy({
      where: {
        id,
        deletedBy, // Menggunakan ID penghapus (deletedBy) sebagai kondisi tambahan
      },
    });
  },


  find(id) {
    return Cars.findByPk(id, {
      attributes: ['id', 'name', 'price', 'size', 'createdBy', 'updatedBy', 'deletedBy'],
    });
  },


  findAll() {
    return Cars.findAll({
      attributes: ['id', 'name', 'price', 'size', 'createdBy', 'updatedBy', 'deletedBy'],
    });
  },

  getTotalPost() {
    return Cars.count();
  },
};
