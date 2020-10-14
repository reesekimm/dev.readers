const passport = require('passport');
const github = require('./github');
const { User } = require('../../models');

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log('======= serializeUser called =======');
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      console.log('======= deserializeUser called =======');
      const user = await User.findOne({ where: { id } });
      done(null, user);
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  github();
};
