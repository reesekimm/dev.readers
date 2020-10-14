const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const { githubVerifyCallback } = require('../controllers/userController');

module.exports = () => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: 'http://localhost:3020/user/auth/github/callback',
      },
      githubVerifyCallback
    )
  );
};
