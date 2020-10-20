const { Review, Book, Comment, User } = require('../../models');

exports.addReview = async (req, res, next) => {
  const {
    body: { Book: bookData, rating, content },
    user: { id: UserId },
  } = req;
  try {
    const book = await Book.findOne({
      where: { isbn13: bookData.isbn13 },
    });

    let bookId = book ? book.id : null;

    if (!book) {
      const newBook = await Book.create({
        ...bookData,
      });
      bookId = newBook.id;
    }

    const review = await Review.create({
      rating,
      content,
      UserId,
      BookId: bookId,
    });

    const fullReview = await Review.findOne({
      where: { id: review.id },
      include: [
        {
          model: Book,
        },
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        {
          model: Comment,
          include: [{ model: User, attributes: ['id', 'nickname'] }],
        },
        {
          model: User,
          as: 'Likers',
          attributes: ['id'],
        },
      ],
    });
    res.status(201).json(fullReview);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.editReview = async (req, res, next) => {
  const {
    body: { id, rating, content },
    user: { id: UserId },
  } = req;
  try {
    await Review.update({ rating, content }, { where: { id }, UserId });
    const updatedReview = await Review.findOne({
      where: { id },
      attributes: ['id', 'rating', 'content'],
    });
    res.status(200).json(updatedReview);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.deleteReview = async (req, res, next) => {
  const {
    params: { reviewId },
    user: { id: UserId },
  } = req;
  try {
    await Comment.destroy({ where: { ReviewId: reviewId } });
    await Review.destroy({
      where: { id: reviewId },
      UserId,
    });
    res.status(200).json({ ReviewId: parseInt(reviewId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.getReview = async (req, res, next) => {
  const { id } = req.query;

  console.log('[ReviewId] ', id);

  try {
    const fullReview = await Review.findOne({
      where: { id },
      include: [
        {
          model: Book,
        },
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        {
          model: Comment,
          include: [{ model: User, attributes: ['id', 'nickname'] }],
        },
        {
          model: User,
          as: 'Likers',
          attributes: ['id'],
        },
      ],
    });
    res.status(200).json(fullReview);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.addLike = async (req, res, next) => {
  const {
    params: { reviewId },
    user: { id: UserId },
  } = req;
  try {
    const review = await Review.findOne({
      where: {
        id: reviewId,
      },
    });
    if (!review) return res.status(403).send('존재하지 않는 리뷰입니다.');
    await review.addLikers(UserId);
    res.status(200).json({ ReviewId: parseInt(reviewId, 10), UserId });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.cancelLike = async (req, res, next) => {
  const {
    params: { reviewId },
    user: { id: UserId },
  } = req;
  try {
    const review = await Review.findOne({
      where: {
        id: reviewId,
      },
    });
    if (!review) return res.status(403).send('존재하지 않는 리뷰입니다.');
    await review.removeLikers(req.user.id);
    res.status(200).json({ ReviewId: parseInt(reviewId, 10), UserId });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.addComment = async (req, res, next) => {
  const {
    params: { reviewId },
    body: { content },
    user: { id: UserId },
  } = req;
  try {
    const review = await Review.findOne({
      where: {
        id: reviewId,
      },
    });
    if (!review) return res.status(403).send('존재하지 않는 리뷰입니다.');

    const comment = await Comment.create({
      content,
      ReviewId: parseInt(reviewId, 10),
      UserId,
    });

    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
      ],
    });
    res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.editComment = async (req, res, next) => {
  const {
    params: { commentId },
    body: { content },
    user: { id: UserId },
  } = req;

  try {
    await Comment.update({ content }, { where: { id: commentId }, UserId });
    const updatedComment = await Comment.findOne({
      where: { id: commentId },
      attributes: ['id', 'ReviewId', 'content'],
    });
    res.status(200).json(updatedComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.deleteComment = async (req, res, next) => {
  const {
    params: { commentId },
    user: { id: UserId },
  } = req;
  try {
    await Comment.destroy({
      where: {
        id: commentId,
      },
      UserId,
    });
    res.status(200).json({ CommentId: parseInt(commentId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
