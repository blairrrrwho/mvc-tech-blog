const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const sequelize = require("../../config/connection");
const withAuth = require('../../utils/auth');


// GET /api/users
router.get('/', async (req, res) => {
  // Access our User model and run .findAll() method
  try {
    const userData = await User.findAll({
      exclude: ['password']
    })
    res.status(200).json(userData)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});

// GET /api/users/1
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
    attributes: {exclude: ['password']},
      include: [
        {
          model: Post,
          attributes: ['id', 'title', 'post_body', 'created_at', 'user_id'],
        },
        {
          model: Comment,
          attributes: ['id', 'comment_body', 'created_at'],
          include: {
            model: Post,
            attributes: ['title']
          }
        },
      ],
    });
    const posts = userData.map((post) => post.get({ plain: true }));
    res.render('userProfiles', {
      posts,
      logged_in: req.session.logged_in,
    });
    if (!userData) {
      res.status(404).json({ message: "No user with this ID was found!" })
      return;
    }
    res.status(200).json(userData)
  } catch (err) {
    console.log(err)
    console.log("userRoutes")
    res.status(500).json(err)
  }
});


// router.get('/:id', async(req, res) => {
//   try {
//     const userData = await User.findByPk({
//       where: {
//         id: req.params.id
//       },
//       include: [{model: Comment}]
//     })
//     if(!userData) {
//       res.status(404).json({message: "No user was found with this ID!"})
//     }
//     res.status(200).json(userData)
//   } catch(err) {
//     console.log("userRoutes")
//     res.status(500).json(err)
//   }
// })


// GET /api/users/profile/1
router.get('/profile/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id);
    if (!userData) {
      res.status(404).json({ message: 'No user was found with this ID!' });
    }
    const user = userData.get({ plain: true });
    res.render('userProfiles', {
      ...user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// Sign Up ====================================================================
router.post('/signup', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.username = newUser.username;
      req.session.email = newUser.email
      req.session.github = newUser.github;
      req.session.logged_in = true;
      req.session.username = req.body.username;
      res.status(200).json(newUser);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});
// Create User
// POST /api/users
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.email = userData.email
      req.session.github = userData.github;
      req.session.logged_in = true;
      res.json({ user: userData, message: "You are now logged in!" });

    })
    res.status(200).json(userData)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});

// Log In =============================================================
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email
      },
    });
    if (!userData) {
      res.status(400).json({
        message: 'Incorrect email, please try again'
      });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({
        message: 'Incorrect password, please try again'
      });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.email = userData.email;
      req.session.github = userData.github;
      req.session.logged_in = true;
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Log Out =============================================================
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// PUT /api/users/1
// router.put('/:id', withAuth, (req, res) => {
//   User.update(req.body, {
//     individualHooks: true,
//     where: {
//       id: req.params.id
//     }
//   })
//     .then(userData => {
//       if (!userData[0]) {
//         res.status(404).json({ message: 'No user found with this id' });
//         return;
//       }
//       res.json(userData);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// DELETE /api/users/1
// router.delete('/:id', withAuth, (req, res) => {
//   User.destroy({
//     where: {
//       id: req.params.id
//     }
//   })
//     .then(userData => {
//       if (!userData) {
//         res.status(404).json({ message: 'No user found with this id' });
//         return;
//       }
//       res.json(userData);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

module.exports = router;