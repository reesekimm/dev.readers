const express = require('express');
const passport = require('passport');

const routes = require('../routes');
const { githubLogin, postGithubLogin, logout } = require('../controllers/userController');

const userRouter = express.Router();

userRouter.get(routes.github, githubLogin);
userRouter.get(
  routes.githubCallback,
  passport.authenticate('github', {
    successFlash: 'Welcome!',
    failureFlash: "Can't log in.",
  }),
  postGithubLogin
);
userRouter.get(routes.logout, logout);

module.exports = userRouter;
