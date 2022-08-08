const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const postSchema = new Schema({
  title: String,
  description: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' }, //or "owner/author"
},{ timestamps: true }); //to show date of creation

module.exports = model('Post', postSchema);
