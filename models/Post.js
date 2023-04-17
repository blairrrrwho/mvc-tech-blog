const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create the Post model
class Post extends Model {}

// Defines a table called Post
Post.init(
  {
    // Defines columns/fields for the Post table
    id: {
      // Configures the associations
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_body: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    // adds a createdAt and updatedAt timestamps to the model
    // default is true, so you can maybe take this line out
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Post;
