const { User } = require("../models/User");

let auth = (req, res, next) => {
  let token = req.cookies.x_auth;
  User.findByToken(token, (err, user) => {
      if (!user) return next();
      req.token = token;
      req.user = user;
      next();
    })
};

module.exports = { auth };