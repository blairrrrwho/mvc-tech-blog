// Contains all of the user-facing routes
const router = require("express").Router();
const sequelize = require("../config/connection");
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
      attributes: ["id", "title", "created_at", "updated_at", "post_body"],
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
// router.get('/post/:id', async (req, res) => {
//   try {
//     const postData = await Post.findByPk(req.params.id, {
//       attributes: ['id', 'title', 'created_at', 'post_body'],
//       include: [
//         {
//           model: User,
//           attributes: ['username', 'github'],
//         },
//         {
//           model: Comment,
//           attributes: ['id', 'comment_body', 'post_id', 'user_id', 'created_at'],
//           include: {
//             model: User,
//             attributes: ['username', 'github']
//           }
//         },
//       ],
//     });

//     const post = postData.get({ plain: true });
//     console.log(postData);
//     // const com = await postData.comments.map((comm) =>
//     //   comm.get({ plain: true })
//     const comment = specificPost.comments.map((test) =>
//     test.get({ plain: true })
//     );
//     // console.log(com);

//     res.render('single-post', {
//       post,
//       com,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Login / directs to login page ==========================================================================
router.get('/login', (req, res) => {
  try {
    res.render('login', {});
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('dashboard');
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// router.get('/login', (req, res) => {
//   // If the user is already logged in, redirect the request to another route
//   if (req.session.logged_in) {
//     res.redirect('dashboard');
//     return;
//   }
//   res.render('login');
// });


// SignUp / directs to signup page - Use withAuth middleware to prevent access to route ====================
// http://localhost:3001/signup
router.get('/signup', async (req, res) => {
  try {
    res.render('signup', {});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



module.exports = router;
