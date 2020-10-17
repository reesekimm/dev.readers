const express = require('express');

const routes = require('../routes');
const { isLoggedIn } = require('../middlewares');
const { addReview, editReview, deleteReview } = require('../controllers/reviewController');

const reviewRouter = express.Router();

reviewRouter.post(routes.addReview, isLoggedIn, addReview);
reviewRouter.patch(routes.editReview, isLoggedIn, editReview);
reviewRouter.delete(routes.deleteReview, isLoggedIn, deleteReview);

module.exports = reviewRouter;
