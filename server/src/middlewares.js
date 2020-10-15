exports.isLoggedIn = (req, res, next) =>
  req.isAuthenticated() ? next() : res.status(401).send('로그인 해주세요.');

exports.isNotLoggedIn = (req, res, next) =>
  !req.isAuthenticated() ? next() : res.status(401).send('이미 로그인한 상태입니다.');
