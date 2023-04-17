const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// dashboard displaying posts created by logged in users
router.get('/', withAuth, async (req, res) => {
  Post.findAll({
    where: {
      // ID from the session
      user_id: req.session.user_id,
    },
    attributes: ['id', 'title', 'created_at', 'post_content'],
    order: [['date', 'DESC']],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username', 'github'],
        },
      },
      {
        model: User,
        attributes: ['username', 'github'],
      },
    ],
  })
    .then((postData) => {
      // serialize data before passing to template
      const posts = postData.map((post) => post.get({ plain: true }));
      res.render('dashboard', { posts, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// rendering edit page
router.get('/edit/:id', withAuth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'post_text', 'title', 'created_at'],
    include: [
      {
        model: User,
        attributes: ['username'],
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
    ],
  })
    .then((dbPostData) => {
      const post = dbPostData.get({ plain: true });
      res.render('edit-posts', { post, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// rendering newpost page
router.get('/newpost', (req, res) => {
  res.render('new-posts');
});

module.exports = router;
