const { Comment } = require("../models");

const commentData = [
  {
    comment_body: "Test test 1 2 3, comment_body wiht post_id 2",
    post_id: 2,
  },
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;