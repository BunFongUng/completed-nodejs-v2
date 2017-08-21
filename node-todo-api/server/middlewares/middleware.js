const bodyParser = require("body-parser");

const morgan = require("morgan");

const { User } = require("../models/user.model");

const appMiddlewares = app => {
  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(morgan("dev"));
};

const authentication = (req, res, next) => {
  let token = req.header("x-auth");

  User.findByToken(token)
    .then(user => {
      if (!user) {
        return Promise.reject();
      }

      req.user = user;
      req.token = token;
      next();
    })
    .catch(err => {
      res.status(401).json({
        status: "error",
        data: null,
        error: {
          message: "Unauthorized"
        }
      });
    });
};

module.exports = {
  appMiddlewares,
  authentication
};
