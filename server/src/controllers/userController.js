const passport = require('passport');

exports.githubLogin = passport.authenticate('github');

exports.githubVerifyCallback = async (accessToken, refreshToken, profile, done) => {
  console.log(profile._json);
  const {
    _json: { login: nickname, id, avatar_url: avatarUrl },
  } = profile;
  return done(null, profile);
};

exports.postGithubLogin = (req, res, next) => {
  console.log('auth finished');
  req.login(req.user, async (error) => {
    if (error) return next(error);
    return res.redirect('http://localhost:3010');
  });
};

exports.logout = (req, res, next) => {
  try {
    req.logout();
    req.session.destroy();
    res.status(200).send('Bye bye~');
  } catch (error) {
    console.error(error);
    next(error);
  }
};
