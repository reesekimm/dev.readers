const express = require('express');

const routes = require('../routes');
const { isLoggedIn } = require('../middlewares');
const {
  addReview,
  editReview,
  deleteReview,
  getReview,
  addLike,
} = require('../controllers/reviewController');

const reviewRouter = express.Router();

reviewRouter.post(routes.addReview, isLoggedIn, addReview);
reviewRouter.patch(routes.editReview, isLoggedIn, editReview);
reviewRouter.delete(routes.deleteReview, isLoggedIn, deleteReview);
reviewRouter.get(routes.getReview, isLoggedIn, getReview);
reviewRouter.patch(routes.addLike, isLoggedIn, addLike);

module.exports = reviewRouter;
