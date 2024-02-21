'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Posts,LikePost}) {
      // define association here
      this.hasMany(Posts,{foreignKey:'userId'})
      this.hasMany(LikePost,{foreignKey:'userId'})
    }
    toJSON()
    {
      return {
        ...this.get(),password:undefined
      }
    }
  }
  User.init({
    username: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:'Please Enter username'
        },
      },
      unique:true
    },
    email:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        isEmail:{
          msg:"please enter valid email"
        },
        notEmpty:{
          msg:'Email Cannot be Empty'
        }
      },
      unique:true
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:'Please Enter a password'
        },
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName:'users'
  });
  return User;
};