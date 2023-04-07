const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Creat a post
router.post('/', withAuth, async (req, res) => {
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

// Delete post
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

// Update Post
router.put("/dashboard", async (req, res) => {
  try {
    console.log(req.body.post_id);
    const updatePost = await Posts.update(req.body, {
      where: {
        id: req.body.post_id,
      },
    });
    res.status(200).json(updatePost);
  } catch (err) {
    console.log(err);
    res.status(200).json(err);
  }
});

module.exports = router;
