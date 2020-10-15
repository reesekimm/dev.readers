const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Book extends Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        link: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        author: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        pubDate: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        isbn13: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        cover: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        categoryName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        publisher: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        modelName: 'Book',
        tableName: 'books',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Book.hasMany(db.Review);
  }
};
