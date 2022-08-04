const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const postSchema = new Schema({
  title: String,
  description: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' }, //or "owner/author"

  //recipe: { type: Schema.Types.ObjectId, ref: 'Recipe' },

  //ein post sollte nur wissen wer ihn erstellt hat,
  //dass rezept weiß welche posts zu ihm gehören


  //for later:
  //notes: //change to target instead of recipe -> to understand better the type
  //type: .... [recipeComment, directMessage, systemMessage]
          //"posts" will have three types
            //comment ->a comment to a recipe
            //directMessage -> messages between users (profilePage only)
            //systemMessage -> notifications like "bob liked your recipe!"

},{ timestamps: true }); //to show date of creation

module.exports = model('Post', postSchema);
