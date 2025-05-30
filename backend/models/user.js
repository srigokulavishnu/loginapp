

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: Number,
  phone: String,
  gender: String,
  photo: String, // store filename or URL of uploaded photo
});

module.exports = mongoose.model('User', userSchema);
