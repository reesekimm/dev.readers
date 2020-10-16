const express = require('express');

const routes = require('../routes');
const { isLoggedIn } = require('../middlewares');
const { addReview, deleteReview } = require('../controllers/reviewController');

const reviewRouter = express.Router();

reviewRouter.post(routes.addReview, isLoggedIn, addReview);
reviewRouter.delete(routes.deleteReview, isLoggedIn, deleteReview);

module.exports = reviewRouter;
