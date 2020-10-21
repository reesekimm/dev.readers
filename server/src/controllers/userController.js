const passport = require('passport');
const { Op } = require('sequelize');

const { User, Review, Comment, Book } = require('../../models');

exports.loadMyInfo = async (req, res, next) => {
  try {
    if (req.user) {
      const fullUser = await User.findOne({
        where: { id: req.user.id },
        include: [
          { model: Review, attributes: ['id'], include: [{ model: Book, attributes: ['isbn13'] }] },
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
    console.log('===== logout called =====');
    req.logout();
    req.session.destroy();
    res.status(200).send('Bye bye~');
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.deleteAccount = async (req, res, next) => {
  const {
    user: { id: UserId },
  } = req;
  try {
    // 작성한 리뷰에 달린 댓글 삭제
    const reviews = await Review.findAll({ where: { UserId }, attributes: ['id'] });
    reviews.forEach(async ({ id }) => {
      await Comment.destroy({ where: { ReviewId: id } });
    });
    // 작성한 리뷰 삭제
    await Review.destroy({ where: { UserId } });
    // 작성한 댓글 삭제
    await Comment.destroy({ where: { UserId } });
    // 사용자 정보 삭제
    await User.destroy({ where: { id: UserId } });
    req.logout();
    req.session.destroy();
    res.status(200).send('See you again!');
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.getUserReviews = async (req, res, next) => {
  const {
    params: { nickname },
    query: { lastId },
  } = req;

  try {
    const user = await User.findOne({ where: { nickname } });
    if (user) {
      const where = { UserId: user.id };
      if (parseInt(lastId, 10)) {
        where.id = { [Op.lt]: parseInt(lastId, 10) };
      }
      const reviews = await user.getReviews({
        where,
        limit: 10,
        order: [
          ['createdAt', 'DESC'],
          [Comment, 'createdAt', 'DESC'],
        ],
        include: [
          {
            model: Book,
          },
          {
            model: User,
            attributes: ['id', 'nickname', 'avatarUrl'],
          },
          {
            model: Comment,
            include: [
              {
                model: User,
                attributes: ['id', 'nickname'],
                order: [['createdAt', 'DESC']],
              },
            ],
          },
          {
            model: User,
            as: 'Likers',
            attributes: ['id'],
          },
        ],
      });
      res.status(200).json(reviews);
    } else {
      res.status(404).send('존재하지 않는 사용자입니다.');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.getUserLikes = async (req, res, next) => {
  const {
    params: { nickname },
    query: { lastId },
  } = req;

  try {
    const user = await User.findOne({ where: { nickname } });
    if (user) {
      if (parseInt(lastId, 10)) {
        where.id = { [Op.lt]: parseInt(lastId, 10) };
      }
      const likes = await user.getLikes({
        limit: 10,
        order: [
          ['createdAt', 'DESC'],
          [Comment, 'createdAt', 'DESC'],
        ],
        include: [
          {
            model: Book,
          },
          {
            model: User,
            attributes: ['id', 'nickname', 'avatarUrl'],
          },
          {
            model: Comment,
            include: [
              {
                model: User,
                attributes: ['id', 'nickname'],
                order: [['createdAt', 'DESC']],
              },
            ],
          },
          {
            model: User,
            as: 'Likers',
            attributes: ['id'],
          },
        ],
      });
      res.status(200).json(likes);
    } else {
      res.status(404).send('존재하지 않는 사용자입니다.');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.loadUserInfo = async (req, res, next) => {
  const {
    params: { nickname },
  } = req;
  try {
    const user = await User.findOne({
      where: { nickname },
      attributes: ['id', 'nickname', 'avatarUrl'],
    });
    user ? res.status(200).json(user) : res.status(404).json('존재하지 않는 사용자입니다.');
  } catch (error) {
    console.error(error);
    next(error);
  }
};
