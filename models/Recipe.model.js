const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const recipeSchema = new Schema({
  title: String,
  description: String,
  image: String,
  servings: Number,
  ingredients:[String],
  cookingAdvice: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' }, //or "owner/author"
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }], //comments to the recipe by other users
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }], 
          //users who liked this recipe (to avoid a user gives 100 likes)

  //-->bookmarks will be in the user, here no sense

},{ timestamps: true }); 

module.exports = model('Recipe', recipeSchema);