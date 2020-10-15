const express = require('express');

const routes = require('../routes');
const { isLoggedIn } = require('../middlewares');
const { addReview } = require('../controllers/reviewController');

const reviewRouter = express.Router();

reviewRouter.post(routes.addReview, isLoggedIn, addReview);

module.exports = reviewRouter;
