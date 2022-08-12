const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const postSchema = new Schema({
  title: String,
  description: String,
  user: String,
},{ timestamps: true }); //to show date of creation

module.exports = model('Post', postSchema);
