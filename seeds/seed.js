const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./postData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of postData) {
    await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  const commentData = [
    {
      comment_body: "This is a test comment for the test post.",
      post_id: 2,
    },
  ];
  
  const seedComment = () => Comment.bulkCreate(commentData);
  

  process.exit(0);
};

seedDatabase();
