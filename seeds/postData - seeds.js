const { Post } = require('../models');

const postData = [
  {
    title: 'Music Near Me',
    post_body:
      'A mobile app that will send you notifications whenever a concert is playing in your area.',
  },
  {
    title: 'The Ultimate Tech Quiz',
    post_body:
      'A web app that will give users 10 new technical questions each day and track their progress in things like programming, cybersecurity, database architecture, and more!',
  },
  {
    title: 'The Ultimate Tech Quiz 2',
    post_body:
      'A revamped version of The Ultimate Tech Quiz: A web app that will give users 10 new technical questions each day and track their progress in things like programming, cybersecurity, database architecture, and more!',
  },
  {
    title: "Roll 'Em Up",
    post_body:
      'A game for Windows and macOS where players move a ball through a series of increasingly challenging mazes.',
  },
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;
