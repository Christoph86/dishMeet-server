const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const postSchema = new Schema({
  title: String,
  description: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' }, //or "owner/author"
  recipe: { type: Schema.Types.ObjectId, ref: 'Recipe' },

  //notes:
  //add target instead of recipe -> to use type --> recipe, directMessage,systemMessage
  //type: .... [recipeComment, directMessage, systemMessage]

  //add timestamps
});

module.exports = model('Post', postSchema);
