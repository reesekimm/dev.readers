const passport = require('passport');

const { User, Review, Comment } = require('../../models');

exports.loadMyInfo = async (req, res, next) => {
  try {
    if (req.user) {
      console.log('user exist!');
      const fullUser = await User.findOne({
        where: { id: req.user.id },
        include: [
          { model: Review, attributes: ['id'] },
          { model: Review, as: 'Likes', attributes: ['id'] },
          { model: Comment, attributes: ['id'] },
        ],
      });
      return res.status(200).json(fullUser);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.githubLogin = passport.authenticate('github');

exports.githubVerifyCallback = async (accessToken, refreshToken, profile, done) => {
  console.log('======= githubVerifyCallback called =======');
  const {
    _json: { login: nickname, id: githubId, avatar_url: avatarUrl },
  } = profile;

  try {
    const user = await User.findOne({
      where: { githubId },
    });
    if (user) return done(null, user);

    const newUser = await User.create({
      nickname,
      githubId,
      avatarUrl,
    });
    return done(null, newUser);
  } catch (error) {
    console.error(error);
    return done(error);
  }
};

exports.postGithubLogin = (req, res, next) => {
  passport.authenticate('github', (serverError, user, clientError) => {
    console.log('======= postGithubLogin called =======');
    if (serverError) {
      console.error(serverError);
      return next(serverError);
    }
    if (clientError.reason) {
      console.error(clientError);
      return res.status(401).send(clientError.reason);
    }
    return req.login(user, async (error) => {
      if (error) return next(error);
      return res.redirect(`http://localhost:3010`);
    });
  })(req, res, next);
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
