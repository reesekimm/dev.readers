const express = require('express');

const routes = require('../routes');
const { isLoggedIn } = require('../middlewares');
const {
  githubLogin,
  postGithubLogin,
  logout,
  loadMyInfo,
} = require('../controllers/userController');

const userRouter = express.Router();

userRouter.get(routes.loadMyInfo, isLoggedIn, loadMyInfo);
userRouter.get(routes.github, githubLogin);
userRouter.get(routes.githubCallback, postGithubLogin);
userRouter.get(routes.logout, isLoggedIn, logout);

module.exports = userRouter;
