/**
 * @file contains request handler of user resource
 * @author Fikri Rahmat Nurhidayat
 */
const userService = require("../../../services/userService");
const jwt = require("jsonwebtoken")

module.exports = {
  registerAdmin(req, res) {
    userService
      .createAdmin(req.body)
      .then((user) => {
        res.status(201).json({
          status: "OK",
          data: user,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  register(req, res) {
    userService
      .create(req.body)
      .then((user) => {
        res.status(201).json({
          status: "OK",
          data: user,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  login(req, res) {
    userService
      .login(req.body)
      .then((user) => {

        if (!user.data) {
          res.status(401).json({
            status: "FAIL",
            message: user.message,
            data: null,
          });

          return;
        }
        res.status(201).json({
          status: "OK",
          data: {
            id: user.data.id,
            name: user.data.name,
            email: user.data.email,
            userRole: user.data.userRole,
            token: user.data.token
          }
        });
      })

      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  authorize(req, res, next) {
    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split("Bearer ")[1];

      const tokenPayload = jwt.verify(token, "secret");

      req.user = tokenPayload;

      next();
    } catch (err) {
      console.log(err)
      res.status(401).json({
        message: "unauthorized",
      });
    }


  },
  superAdmin(req, res, next) {
    try {
      const { userRole } = req.user;
      if (userRole === "superAdmin") return next();
      res.status(403).json({
        message: "Anda tidak memiliki akses",
      });

    } catch (err) {
      console.log(err)
      res.status(401).json({
        message: "unauthorized",
      });
    }


  }
};
