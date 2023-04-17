const { Comment } = require('../models');

const commentData = [
    {
        user_id: 1,
        post_id: 7,
        comment_text: "Whooooaaaa pretty cool stuff right there."
    },
    {
        user_id: 2,
        post_id: 6,
        comment_text: "Wow, this sucks."
    },
    {
        user_id: 3,
        post_id: 5,
        comment_text: "Can you explain to me how this works?"
    },
    {
        user_id: 4,
        post_id: 3,
        comment_text: "Ayeeeeeeee nice work!!!!"
    },
    {
        user_id: 5,
        post_id: 4,
        comment_text: "Love this for you :)."
    },
    {
        user_id: 6,
        post_id: 2,
        comment_text: "This is wild."
    },
    {
        user_id: 7,
        post_id: 1,
        comment_text: "Will be contacting you soon!"
    }
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;