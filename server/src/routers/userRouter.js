const express = require('express');

const routes = require('../routes');
const { isLoggedIn } = require('../middlewares');
const {
  loadMyInfo,
  githubLogin,
  postGithubLogin,
  logout,
  getUserReviews,
  getUserLikes,
  loadUserInfo,
} = require('../controllers/userController');

const userRouter = express.Router();

userRouter.get(routes.loadMyInfo, isLoggedIn, loadMyInfo);
userRouter.get(routes.github, githubLogin);
userRouter.get(routes.githubCallback, postGithubLogin);
userRouter.get(routes.logout, isLoggedIn, logout);
userRouter.get(routes.getUserReviews, getUserReviews);
userRouter.get(routes.getUserLikes, getUserLikes);
userRouter.get(routes.loadUserInfo, loadUserInfo);

module.exports = userRouter;
