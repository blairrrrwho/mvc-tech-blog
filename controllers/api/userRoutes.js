const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');




// GET /api/users
router.get('/', (req, res) => {
  // Access our User model and run .findAll() method
  User.findAll({
      attributes: { exclude: ['password'] }
  })
    .then(userData => res.json(userData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
  User.findOne({
      attributes: { exclude: ['password']},
      where: {
        id: req.params.id
      },
      include: [
          {
            model: Post,
            attributes: ['id', 'title', 'post_body', 'created_at']
          },
          {
              model: Comment,
              attributes: ['id', 'comment_body', 'created_at'],
              include: {
                model: Post,
                attributes: ['title']
              }
          }
        ]

  })
    .then(userData => {
      if (!userData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(userData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST /api/users
router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    github: req.body.github
  })
  .then(userData => {
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.github = userData.github;
      req.session.loggedIn = true;
  
      res.json(userData);
    });
  });
});



// Login =============================================================
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
    const username = await userData.returnUserName();

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.github = userData.github;
      res.status(200).json({ user: userData, message: 'You are logged in!' });
      console.log("you are now logged in and session has been saved.");
    });
  } catch (err) {
    res.status(400).json(err);
  }
});



// ??
// Sign up ====================================================================
router.post('/signup', async (req, res) => {
  try {
    const newUser = User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.username = req.body.username;
      res.status(200).json(newUser);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});




// Logout =====================================================================
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});





// PUT /api/users/1
router.put('/:id', withAuth, (req, res) => {
  User.update(req.body, {
      individualHooks: true,
      where: {
          id: req.params.id
    }
  })
    .then(userData => {
      if (!userData[0]) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(userData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE /api/users/1
router.delete('/:id', withAuth, (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(userData => {
      if (!userData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(userData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;





module.exports = router;
