const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const recipeSchema = new Schema({
  title: String,
  description: String,
  ingredients:[String],
  cookingAdvice: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' }, //or "owner/author"
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});

module.exports = model('Recipe', recipeSchema);
