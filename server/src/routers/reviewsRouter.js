const express = require('express');

const routes = require('../routes');
const { getReviews } = require('../controllers/reviewsController');

const reviewsRouter = express.Router();

reviewsRouter.get(routes.getReviews, getReviews);

module.exports = reviewsRouter;
