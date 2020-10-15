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
