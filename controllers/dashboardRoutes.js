const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Dashboard / dashboard displaying posts created by logged in user ======================================
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        // ID from the session
        user_id: req.session.user_id,
      },
      attributes: ['id', 'title', 'created_at', 'post_body', 'user_id'],
      // order: [['date', 'DESC']],
      include: [
        {
          model: Comment,
          attributes: [
            'id',
            'comment_body',
            'post_id',
            'user_id',
            'created_at',
          ],
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
    });
    // serialize data before passing to template
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('dashboard', { posts, logged_in: true });
  
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Editing a post / rendering edit-post page ======================================================
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const editPost = await Post.findByPk({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'post_body', 'title', 'created_at'],
      include: [
        {
          model: Comment,
          attributes: [
            'id',
            'comment_body',
            'post_id',
            'user_id',
            'created_at',
          ],
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
    });
    if (!editPost) {
      res.status(404).json({ message: 'No post found with this ID.' });
      return;
    }
    // serialize the data
    const post = editPost.get({ plain: true });
    res.render('edit-post', {
      post,
      logged_in: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Creating a post / rendering add-post page ======================================================
router.get('/create', withAuth, async (req, res) => {
  try {
    const newPost = await Post.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id,
      },
      attributes: ['id', 'title', 'created_at', 'post_body', 'user_id'],
      include: [
        {
          model: Comment,
          attributes: [
            'id',
            'comment_body',
            'post_id',
            'user_id',
            'created_at',
          ],
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
    });
    // serialize data before passing to template
    const posts = newPost.map((post) => post.get({ plain: true }));
    res.render('create-post', { posts, logged_in: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
