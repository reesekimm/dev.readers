const USER = '/user';
const LOAD_MY_INFO = '/';
const GITHUB = '/auth/github';
const GITHUB_CALLBACK = '/auth/github/callback';
const LOG_OUT = '/logout';
const GET_USER_REVIEWS = '/:nickname/reviews';
const GET_USER_LIKES = '/:nickname/likes';
const LOAD_USER_INFO = '/:nickname';

const REVIEW = '/review';
const ADD_REVIEW = '/review';
const EDIT_REVIEW = '/:reviewId';
const DELETE_REVIEW = '/:reviewId';
const GET_REVIEW = '/';
const LIKE = '/:reviewId/like';
const ADD_COMMENT = '/:reviewId/comment';
const EDIT_COMMENT = '/comment/:commentId';
const DELETE_COMMENT = '/comment/:commentId';

const REVIEWS = '/reviews';
const GET_REVIEWS = '/';

const SEARCH = '/search';
const SEARCH_BOOK = '/book';

const routes = {
  user: USER,
  loadMyInfo: LOAD_MY_INFO,
  github: GITHUB,
  githubCallback: GITHUB_CALLBACK,
  logout: LOG_OUT,
  getUserReviews: GET_USER_REVIEWS,
  getUserLikes: GET_USER_LIKES,
  loadUserInfo: LOAD_USER_INFO,
  review: REVIEW,
  addReview: ADD_REVIEW,
  editReview: EDIT_REVIEW,
  deleteReview: DELETE_REVIEW,
  getReview: GET_REVIEW,
  likeReview: LIKE,
  addComment: ADD_COMMENT,
  editComment: EDIT_COMMENT,
  deleteComment: DELETE_COMMENT,
  reviews: REVIEWS,
  getReviews: GET_REVIEWS,
  search: SEARCH,
  searchBook: SEARCH_BOOK,
};

module.exports = routes;
