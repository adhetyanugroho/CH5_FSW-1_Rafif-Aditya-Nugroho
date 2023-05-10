const postRepository = require("../repositories/postRepository");

module.exports = {
  create(request) {
    const { name, price, size, image } = request.body;
    const { id } = request.user;
    return postRepository.create({ name, price, size, image, createdBy: id });
  },

  // update(id, requestBody) {
  //   return postRepository.update(id, requestBody);
  // },

  update(id, requestBody) {
    const { name, price, size, image, user } = requestBody;
    const idUser = user && user.idUser;

    const updatedPost = {
      name,
      price,
      size,
      image,
      updatedBy: idUser
    };

    return postRepository.update(id, updatedPost)
      .then(() => updatedPost);
  },


  // delete(id) {
  //   return postRepository.delete(id);
  // },

  delete(id, deletedBy) {
    return postRepository.delete(id, deletedBy);
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
