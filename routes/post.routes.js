const router = require("express").Router();
const Post = require('../models/Post.model');
const Recipe = require('../models/Recipe.model');


// CREATE create new post
router.post('/posts', (req, res, next) => {
  const { title, description, user, recipeId } = req.body;

  Post.create({ title, description, user })
    .then(
       newPost => {
       return Recipe.findByIdAndUpdate(recipeId, { $push: { posts: newPost._id } } );
    }
    )
    .then(response => res.json(response))
    .catch(err => res.json(err));
});


module.exports = router;
