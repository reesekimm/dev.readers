const USER = '/user';
const LOAD_MY_INFO = '/';
const GITHUB = '/auth/github';
const GITHUB_CALLBACK = '/auth/github/callback';
const LOG_OUT = '/logout';

const REVIEW = '/review';
const ADD_REVIEW = '/review';
const DELETE_REVIEW = '/:reviewId';

const SEARCH = '/search';
const SEARCH_BOOK = '/book';

const routes = {
  user: USER,
  loadMyInfo: LOAD_MY_INFO,
  github: GITHUB,
  githubCallback: GITHUB_CALLBACK,
  logout: LOG_OUT,
  review: REVIEW,
  addReview: ADD_REVIEW,
  deleteReview: DELETE_REVIEW,
  search: SEARCH,
  searchBook: SEARCH_BOOK,
};

module.exports = routes;
