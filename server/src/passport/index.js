const passport = require('passport');
const github = require('./github');
const { User } = require('../../models');

module.exports = () => {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });

  github();
};
