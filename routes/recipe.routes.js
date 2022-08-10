const router = require("express").Router();
const mongoose = require('mongoose');

const { isAuthenticated } = require("../middleware/jwt.middleware")

const Recipe = require('../models/Recipe.model');
const Post = require('../models/Post.model');
//const { response } = require("express");


//CREATE new recipe
router.post('/recipes', isAuthenticated, (req, res, next) => {
    const {
        title,
        description,
        image,
        servings,
        ingredients,
        cookingAdvice,
        user } = req.body; //, req.body.user is just the user._id

    Recipe.create({
        title,
        description,
        image,
        servings,
        ingredients,
        cookingAdvice,
        user
    })
        .then(response => {
            res.json(response)
        })
        .catch(err => res.json(err));
});

//READ list all Recipes 
router.get('/recipes', (req, res, next) => {
    Recipe.find()
        .populate("user")
        .then(allRecipes => {
            res.json(allRecipes)
        })
        .catch(err => res.json(err));
});


//READ recipe details
router.get('/recipes/:recipeId', (req, res, next) => {
    const { recipeId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(recipeId)) {    //validate recipeId
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    // Each Recipe document has `posts` array holding `_id`s of Post documents
    // We use .populate() method to get swap the `_id`s for the actual Post documents
    Recipe.findById(recipeId)
        .populate("user")
        .populate('posts')
        .then(recipe => res.json(recipe))
        .catch(error => res.json(error));
});


//UPDATE recipe -->req.body does not contain user._id (owner/author), would not be changed
router.put('/recipes/:recipeId', isAuthenticated, (req, res, next) => {
    const { recipeId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Recipe.findById(recipeId)
        .then(recipe => {
            if (req.payload._id == recipe.user) { //secure Backend by check if user from payload eq author of ressource
                Recipe.findByIdAndUpdate(recipeId, req.body, { returnDocument: 'after' })
                    .then((updatedRecipe) => res.json(updatedRecipe))
                    .catch(error => res.json(error));
            }
            else res.status(401).json({ message: 'Unauthorized PUT request, you are not the Author of these ressource' });
        })
        .catch(error => res.json(error))
});

//UPDATE recipe.likes -checks if authenticated, but don't check if author
router.put('/recipes/:recipeId/likes', isAuthenticated, (req, res, next) => {
    const { recipeId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Recipe.findByIdAndUpdate(recipeId, req.body, { returnDocument: 'after' })
    .then((updatedRecipe) => res.json(updatedRecipe))
    .catch(error => res.json(error));
});


//DELETE recipe
router.delete('/recipes/:recipeId', isAuthenticated, (req, res, next) => {
    const { recipeId } = req.params;
    console.log("DELETE req.payload: ", req.payload);
    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Recipe.findById(recipeId)
        .then(recipe => {
            if (req.payload._id == recipe.user) { //secure Backend by check if user from payload eq author of ressource
                Recipe.findByIdAndRemove(recipeId)
                    .then(deteletedRecipe => {
                        return Post.deleteMany({ _id: { $in: deteletedRecipe.posts } });
                    })
                    .then(() => res.json({ message: `Recipe with id ${recipeId} & all associated tasks were removed successfully.` }))
                    .catch(error => res.status(500).json(error));
            }
            else res.status(401).json({ message: 'Unauthorized DELETE request, you are not the Author of these ressource' });
        })
        .catch(error => res.json(error))
});

module.exports = router;
