// Contains all of the user-facing routes
const router = require("express").Router();
const sequelize = require("../config/connection")
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Homepage / directs to get all posts =================================================================================
// http://localhost:3001/
router.get('/', async (req, res) => {
  console.log(req.session);
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      // order: [['date', 'DESC']],
      attributes: ["id", "title", "created_at", "post_body"],
      include: [
        {
          model: Comment,
          attributes: [
            "id",
            "comment_body",
            "post_id",
            "user_id",
            "created_at",
          ],
          include: {
            model: User,
            attributes: ["username", "github"],
          },
        },
        {
          model: User,
          attributes: ["username", "github"],
        },
      ],
    });
    // serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
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
    const postData = await Post.findByPk(req.params.id, {
      attributes: ['id', 'title', 'created_at', 'post_body'],
      include: [
        {
          model: User,
          attributes: ['username', 'github'],
        },
        {
          model: Comment,
          attributes: ['id', 'comment_body', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username', 'github']
          }
        },
      ],
    });
    const post = postData.get({ plain: true });
    console.log(postData);
    const comment = postData.comments.map((test) =>
    test.get({ plain: true })
    );
    res.render('single-post', {
      post,
      comment,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/users", async (req, res)=> {
  try {
    const data = await User.findAll()
    res.status(200).json(data)
  } catch(err) {
    res.status(500).json(err)
  }
})

router.get('/users/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id);
    if (!userData) {
      res.status(404).json({ message: 'No user was found with this ID!' });
    }
    const user = userData.get({ plain: true });
    res.render('userProfiles', {
      user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



// Login / directs to login page ==========================================================================
// router.get('/login', (req, res) => {
//   try {
//     res.render('login', {});
//     // If the user is already logged in, redirect the request to another route
//     if (req.session.logged_in) {
//       res.redirect('/dashboard');
//       return;
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// // Use withAuth middleware to prevent access to route
// router.get('/dashboard', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Post }],
//     });
//     const user = userData.get({ plain: true });
//     res.render('dashboard', {
//       ...user,
//       logged_in: true,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

// SignUp / directs to signup page - Use withAuth middleware to prevent access to route ====================
// http://localhost:3001/signup
// router.get('/signup', (req, res) => {
//   try {
//     res.render('signup', {});
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

module.exports = router;
