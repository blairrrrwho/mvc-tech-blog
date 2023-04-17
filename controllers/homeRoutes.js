// Contains all of the user-facing routes ====================================================
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Homepage =================================================================================
router.get('/', (req, res) => {
  console.log(req.session);

  // Get all posts and JOIN with user data
  Post.findAll({
    attributes: [
      'id',
      'title',
      'created_at',
      'post_body'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_body', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username', 'github']
        }
      },
      {
        model: User,
        attributes: ['username', 'github']
      }
    ]
  })
    .then(postData => {
      // Serialize data so the template can read it 
      const posts = postData.map(post => post.get({ plain: true }));
      res.render('homepage', {
          posts,
          loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// router.get('/', async (req, res) => {
//   try {
//     // Get all posts and JOIN with user data
//     const postData = await Post.findAll({
//       order: [['date', 'DESC']]
//     });
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//         {
//           model: Comment,
//           attributes: ['comment_body'],
//         },
//       ],
//     });




// Single post view / directs to single-post page ==============================================
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username', 'github'],
        },
        {
          model: Comment,
          attributes: ['comment_body'],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('post', {
      ...post,
      logged_in: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  // if the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// Use withAuth middleware to prevent access to route ====================
router.get('/signup', withAuth, async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});


// ------------- login ----------------- 
router.get("/login", async (req, res) => {
  try {
    res.render("login", {});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// ------------ signup ------------------

router.get("/signup", async (req, res) => {
  try {
    res.render("signup", {});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;