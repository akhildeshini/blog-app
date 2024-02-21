'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class likePost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Posts,User}) {
      // define association here
      this.belongsTo(Posts,{foreignKey:'postId'});
      this.belongsTo(User,{foreignKey:'userId'});
    }
  }
  likePost.init({
    userId: {type:DataTypes.INTEGER,
      allowNull:false},
      likes: {type:DataTypes.INTEGER,
        defaultValue:0},
        postId: {type:DataTypes.INTEGER,
          allowNull:false},
  }, {
    sequelize,
    modelName: 'LikePost',
    tableName:'likePosts'
  });
  return likePost;
};