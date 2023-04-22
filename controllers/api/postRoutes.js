const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get post by id ================================================
router.get('/:id', withAuth, async(req, res) => {
  console.log('made it to get post by id');
  try {
    const idPost = await Post.findByPk({
    attributes: ['id', 'title', 'created_at', 'post_body'],
    order: [['created_at', 'DESC']],
    include: [
      // Comment model here -- attached username to comment
      {
        model: Comment,
        attributes: ['id', 'comment_body', 'post_id', 'user_id', 'created_at'],
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
  const posts = idPost.map((post) => post.get({ plain: true }));
  const comment = idPost.comments.map((test) => test.get({ plain: true }))
  res.render('single-post', {
    posts,
    comment,
    logged_in: req.session.logged_in,
  });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all users by id ===========================================
router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'title', 'created_at', 'post_body'],
    include: [
      // include the Comment model here:
      {
        model: User,
        attributes: ['username', 'github'],
      },
      {
        model: Comment,
        attributes: ['id', 'comment_body', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username', 'github'],
        },
      },
    ],
  })
    .then((postData) => {
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(postData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Create post ====================================================
router.post('/', withAuth, async (req, res) => {
  console.log("made it to create post route");
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete post ===========================================================
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update Post ===========================================================
router.put('/:id', withAuth, async (req, res) => {
  try {
    console.log(req.body.post_id);
    const updatePost = await Post.update(req.body, {
      where: {
        id: req.body.post_id,
      },
    });
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    res.status(200).json(updatePost);
  } catch (err) {
    console.log(err);
    res.status(200).json(err);
  }
});

module.exports = router;
