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
  editComment,
  deleteComment,
} = require('../controllers/reviewController');

const reviewRouter = express.Router();

reviewRouter.post(routes.addReview, isLoggedIn, addReview);
reviewRouter.patch(routes.editReview, isLoggedIn, editReview);
reviewRouter.delete(routes.deleteReview, isLoggedIn, deleteReview);

reviewRouter.get(routes.getReview, getReview);

reviewRouter.patch(routes.likeReview, isLoggedIn, addLike);
reviewRouter.delete(routes.likeReview, isLoggedIn, cancelLike);

reviewRouter.post(routes.addComment, isLoggedIn, addComment);
reviewRouter.patch(routes.editComment, isLoggedIn, editComment);
reviewRouter.delete(routes.deleteComment, isLoggedIn, deleteComment);

module.exports = reviewRouter;
