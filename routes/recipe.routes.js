const router = require("express").Router();

const mongoose = require('mongoose');

const { isAuthenticated } = require("../middleware/jwt.middleware")

const Recipe = require('../models/Recipe.model');
const Post = require('../models/Post.model');



//READ list all Recipes 
router.get('/recipes', (req, res, next) => {
    Recipe.find()
      //  .populate("posts")
        .then(allRecipes => {
            res.json(allRecipes)
        })
        .catch(err => res.json(err));
});


//CREATE new recipe
router.post('/recipes', isAuthenticated, (req, res, next) => {
    const { title, description, user } = req.body; //, req.body.user is just the user._id

    Recipe.create({ title, description, user }) //, posts: [] ->no posts on create
        .then(response => res.json(response))
        .catch(err => res.json(err));
});



//READ recipe details
router.get('/recipes/:recipeId', (req, res, next) => {
    const { recipeId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(recipeId)) {    //validate recipeId
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    // Each Recipe document has `tasks` array holding `_id`s of Task documents
    // We use .populate() method to get swap the `_id`s for the actual Task documents
    Recipe.findById(recipeId)
        .populate('posts')
        .then(recipe => res.json(recipe))
        .catch(error => res.json(error));
});



//UPDATE recipe -->req.body does not contain user._id (owner/author), would not be changed
router.put('/recipes/:recipeId', isAuthenticated, (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.recipeId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Recipe.findByIdAndUpdate(req.params.recipeId, req.body, { returnDocument: 'after' })
        .then((updatedRecipe) => res.json(updatedRecipe))
        .catch(error => res.json(error));
});



//DELETE recipe
router.delete('/recipes/:recipeId', isAuthenticated, (req, res, next) => {
    const { recipeId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Recipe.findByIdAndRemove(recipeId)
        .then(deteletedRecipe => {
            return Post.deleteMany({ _id: { $in: deteletedRecipe.posts } });
        })
        .then(() => res.json({ message: `Recipe with id ${recipeId} & all associated tasks were removed successfully.` }))
        .catch(error => res.status(500).json(error));
});

module.exports = router;
