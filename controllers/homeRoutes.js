// Contains all of the user-facing routes
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Homepage / directs to get all posts =================================================================================
// http://localhost:3001/
router.get('/', async (req, res) => {
  console.log(req.session);
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      order: [['date', 'DESC']],
      attributes: ['id', 'title', 'created_at', 'post_body'],
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
    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Single post view / directs to single-post page =====================================================
// http://localhost:3001/post/1
router.get('/post/:id', async (req, res) => {
  try {
    const specificPost = await Post.findByPk({
      where: { id: req.params.id },
      attributes: ['id', 'title', 'created_at', 'post_body'],
      include: [
        {
          model: User,
          attributes: ['username', 'github'],
        },
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
      ],
    });
    // serialize the data
    const post = specificPost.comments.map((test) => test.get({ plain: true }));
    // pass data to template
    res.status(200).render('single-post', {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login / directs to login page ==========================================================================
router.get('/login', async (req, res) => {
  try {
    res.render('login', {});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  // if the user is already logged in, redirect the request to the homepage
  // take out?
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
});

// SignUp / directs to signup page - Use withAuth middleware to prevent access to route ====================
router.get('/signup', withAuth, async (req, res) => {
  try {
    res.render('signup', {});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  // if the user is already logged in, redirect the request to the homepage
  // take out?
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
});

module.exports = router;
