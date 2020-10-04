const express = require('express');

const routes = require('../routes');
const { searchBook } = require('../controllers/searchController');

const searchRouter = express.Router();

searchRouter.get(routes.searchBook, searchBook);

module.exports = searchRouter;
