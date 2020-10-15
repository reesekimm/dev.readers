const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        nickname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        githubId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: true,
        },
        avatarUrl: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        modelName: 'User',
        tableName: 'users',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        sequelize,
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Review);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Review, { through: 'Like', as: 'Likes' });
  }
};
