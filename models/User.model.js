// models/User.model.js

const mongoose = require("mongoose");
const { Schema, model } = mongoose;


const userSchema = new Schema({
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  //recipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }]
  //try to remove

  //for later
  //bookmarks: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }]
  //likes: bookmarks: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }]
  //very later
  //messages : [{ type: Schema.Types.ObjectId, ref: 'Post' }]
        //"posts" will have three types
            //comment ->a comment to a recipe
            //directMessage -> messages between users (profilePage only)
            //systemMessage -> notifications like "bob liked your recipe!"
},{ timestamps: true }); //showing last activityDate, created??

module.exports = model("User", userSchema);
