'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User,LikePost}) {
      // define association here
      this.belongsTo(User,{foreignKey:'userId'})
      this.hasMany(LikePost,{foreignKey:'postId'})
    }
  }
  Posts.init({
    title: {type:DataTypes.STRING,
    allowNull:false},
    description: {type:DataTypes.STRING,
      allowNull:false},
    image: DataTypes.STRING,
    userId: {type:DataTypes.INTEGER,
      allowNull:false},
    likes: {type:DataTypes.INTEGER,
      defaultValue:0},
  }, {
    sequelize,
    modelName: 'Posts',
    tableName:'posts'
  });
  return Posts;
};