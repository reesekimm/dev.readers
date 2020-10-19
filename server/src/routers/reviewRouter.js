const express = require('express');

const routes = require('../routes');
const { isLoggedIn } = require('../middlewares');
const {
  addReview,
  editReview,
  deleteReview,
  getReview,
  addLike,
  cancelLike,
  addComment,
} = require('../controllers/reviewController');

const reviewRouter = express.Router();

reviewRouter.post(routes.addReview, isLoggedIn, addReview);
reviewRouter.patch(routes.editReview, isLoggedIn, editReview);
reviewRouter.delete(routes.deleteReview, isLoggedIn, deleteReview);
reviewRouter.get(routes.getReview, isLoggedIn, getReview);
reviewRouter.patch(routes.likeReview, isLoggedIn, addLike);
reviewRouter.delete(routes.likeReview, isLoggedIn, cancelLike);
reviewRouter.post(routes.addComment, isLoggedIn, addComment);

module.exports = reviewRouter;
