const { User } = require("../models/User");

let auth = (req, res, next) => {
  let token = req.cookies.x_auth;

  User.findByToken(token)
    .then((user) => {
      if (!user) return next();
      req.token = token;
      req.user = user;
      next();
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = { auth };