/**
 * @file contains request handler of post resource
 * @author Fikri Rahmat Nurhidayat
 */
const postService = require("../../../services/postService");

module.exports = {
  list(req, res) {
    postService
      .list()
      .then(({ data, count }) => {
        res.status(200).json({
          status: "OK",
          data: { posts: data },
          meta: { total: count },
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  create(req, res) {
    postService
      .create(req)
      .then((post) => {
        res.status(201).json({
          status: "OK",
          data: post,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },


  update(req, res) {
    const { id } = req.params;
    const { name, price, size, image, user } = req.body;
    const updatedPost = { name, price, size, image, updatedBy: user && user.idUser };

    postService
      .update(id, updatedPost)
      .then((updatedPost) => {
        res.status(200).json({
          status: "OK",
          message: `Successfully updated by ${id}.`,
          data: updatedPost,

        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  show(req, res) {
    postService
      .get(req.params.id)
      .then((post) => {
        res.status(200).json({
          status: "OK",
          data: post,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },


  destroy(req, res) {
    const deletedBy = req.user.id;
    postService
      .delete(req.params.id, deletedBy)
      .then(() => {
        res.status(200).json({
          status: "OK",
          message: `Successfully deleted by ${deletedBy}.`,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },


};
