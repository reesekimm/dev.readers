const { Op } = require('sequelize');

const { Review, Book, User, Comment } = require('../../models');

exports.getReviews = async (req, res, next) => {
  try {
    const lastId = parseInt(req.query.lastId, 10);
    const where = {};
    if (lastId) {
      where.id = { [Op.lt]: lastId };
    }

    const reviews = await Review.findAll({
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
              attributes: ['id', 'nickname', 'avatarUrl'],
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
  } catch (error) {
    console.error(error);
    next(error);
  }
};
