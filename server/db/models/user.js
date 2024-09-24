'use strict';

const bcrypt = require('bcrypt')

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
    static associate(models) {
      // define association here
      
    }
    checkPassword(loginPassword) {
      return bcrypt.compareSync(loginPassword, this.password)
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  }, {
    hooks: {
      beforeCreate: async (newUser) => {
        newUser.password = await bcrypt.hash(newUser.password, 10)
        return newUser
      },
      beforeUpdate : async (updatedUser) => {
        updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
        return updatedUser; 
      },  
    },
    sequelize,
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    modelName: 'User',
    tableName: 'Users',
    paranoid: true
  });
  return User;
};