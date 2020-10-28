const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const { githubVerifyCallback } = require('../controllers/userController');

const BASE_URL =
  process.env.NODE_ENV === 'production' ? process.env.BASE_URL_PROD : process.env.BASE_URL_DEV;

module.exports = () => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `${BASE_URL}/user/auth/github/callback`,
      },
      githubVerifyCallback
    )
  );
};
