const postRepository = require("../repositories/postRepository");

module.exports = {
  create(request) {
    const { name, price, size, image } = request.body;
    const { id } = request.user;
    return postRepository.create({ name, price, size, image, createdBy: id });
  },

  update(id, request) {
    const { name, price, size, image } = request.body;
    const { idUser } = request.user;
    return postRepository.update({ name, price, size, image, updatedBy: idUser }, { where: { id } });
  },

  // update(id, request) {
  //   const { name, price, size, image } = request.body;
  //   const { idUser } = request.user;
  //   const { idCar } = request.params.id;
  //   return postRepository.update({ name, price, size, image, updatedBy: idUser }, { where: { id: idCar } });
  // },

  delete(id) {
    return postRepository.delete(id);
  },

  async list() {
    try {
      const posts = await postRepository.findAll();
      const postCount = await postRepository.getTotalPost();

      return {
        data: posts,
        count: postCount,
      };
    } catch (err) {
      throw err;
    }
  },

  get(id) {
    return postRepository.find(id);
  },
};
