const router = require("express").Router();
// const mongoose = require('mongoose');

const Post = require('../models/Post.model');
const Recipe = require('../models/Recipe.model');



//  POST /api/tasks  -  Creates a new task
router.post('/posts', (req, res, next) => {
  const { title, description, recipeId } = req.body;

  Post.create({ title, description, recipeId })
    .then(newPost => {
      return Recipe.findByIdAndUpdate(recipeId, { $push: { posts: newPost._id } } );
    })
    .then(response => res.json(response))
    .catch(err => res.json(err));
});


module.exports = router;
