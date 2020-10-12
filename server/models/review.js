const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Review extends Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        modelName: 'Review',
        tableName: 'reviews',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Review.belongsTo(db.User);
    db.Review.hasMany(db.Comment);
    db.Review.belongsToMany(db.User, { through: 'Like', as: 'Likers' });
  }
};
