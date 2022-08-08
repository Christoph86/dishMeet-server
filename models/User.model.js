const mongoose = require("mongoose");
const { Schema, model } = mongoose;


const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowerCase: true
  },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },

},{ timestamps: true });

module.exports = model("User", userSchema);
