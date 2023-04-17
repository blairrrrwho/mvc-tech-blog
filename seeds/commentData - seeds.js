const { Comment } = require('../models');

const commentData = [
    {
        user_id: 1,
        post_id: 7,
        comment_body: "Whooooaaaa pretty cool stuff right there."
    },
    {
        user_id: 2,
        post_id: 6,
        comment_body: "Wow, this sucks."
    },
    {
        user_id: 3,
        post_id: 5,
        comment_body: "Can you explain to me how this works?"
    },
    {
        user_id: 4,
        post_id: 3,
        comment_body: "Ayeeeeeeee nice work!!!!"
    },
    {
        user_id: 5,
        post_id: 4,
        comment_body: "Love this for you :)."
    },
    {
        user_id: 6,
        post_id: 2,
        comment_body: "This is wild."
    },
    {
        user_id: 7,
        post_id: 1,
        comment_body: "Will be contacting you soon!"
    }
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;