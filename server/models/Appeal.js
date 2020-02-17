const mongoose = require('mongoose');

const { Schema } = mongoose;

const appealSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  text: {
    type: String,
    required: true
  },

  date: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('appeals', appealSchema);
