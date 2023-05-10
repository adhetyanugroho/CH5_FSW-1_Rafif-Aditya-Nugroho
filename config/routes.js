const express = require("express");
const controllers = require("../app/controllers");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/CarAPI.json');
const cors = require('cors');
const apiRouter = express.Router();

apiRouter.use(cors());

apiRouter.use('/api-docs', swaggerUi.serve);
apiRouter.get('/api-docs', swaggerUi.setup(swaggerDocument));

/**
 * TODO: Implement your own API
 *       implementations
 */
//Users
apiRouter.post("/api/v1/users", controllers.api.v1.userController.create);

//endpoint untuk registrasi admin oleh superAdmin
apiRouter.post("/api/v1/register/admin", controllers.api.v1.authController.authorize, controllers.api.v1.authController.superAdmin, controllers.api.v1.authController.registerAdmin);

//endpoint untuk registrasi sebagai member.
apiRouter.post("/api/v1/register", controllers.api.v1.authController.register);


//endpoint untuk login sebagai superadmin, admin, maupun member.
apiRouter.post("/api/v1/login", controllers.api.v1.authController.login);


//endpoint untuk menambahkan admin oleh superadmin.



//4 endpoint untuk melakukan CRUD terhadap data mobil
apiRouter.get("/api/v1/cars", controllers.api.v1.authController.authorize, controllers.api.v1.postController.list);
apiRouter.post("/api/v1/cars/create", controllers.api.v1.authController.authorize, controllers.api.v1.postController.create);
apiRouter.put("/api/v1/cars/:id", controllers.api.v1.authController.authorize, controllers.api.v1.postController.update);
apiRouter.get("/api/v1/cars/:id", controllers.api.v1.authController.authorize, controllers.api.v1.postController.show);
apiRouter.delete("/api/v1/cars/:id", controllers.api.v1.authController.authorize, controllers.api.v1.postController.destroy);


//endpoint untuk melihat daftar mobil yang tersedia.
apiRouter.get("/api/v1/cars", controllers.api.v1.authController.authorize, controllers.api.v1.postController.list);

//endpoint untuk melihat current user dari token yang dimiliki.
apiRouter.get("/api/v1/users", controllers.api.v1.authController.authorize, controllers.api.v1.userController.list);

/**
 * TODO: Delete this, this is just a demonstration of
 *       error handler
 */
apiRouter.get("/api/v1/errors", () => {
  throw new Error(
    "The Industrial Revolution and its consequences have been a disaster for the human race."
  );
});

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
