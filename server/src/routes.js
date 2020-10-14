const USER = '/user';
const GITHUB = '/auth/github';
const GITHUB_CALLBACK = '/auth/github/callback';
const LOG_OUT = '/logout';

const SEARCH = '/search';
const SEARCH_BOOK = '/book';

const routes = {
  user: USER,
  logout: LOG_OUT,
  github: GITHUB,
  githubCallback: GITHUB_CALLBACK,
  search: SEARCH,
  searchBook: SEARCH_BOOK,
};

module.exports = routes;
