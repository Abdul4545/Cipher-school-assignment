const mongoose = require('mongoose');


const questionSchema = new mongoose.Schema({

  question: {
    type: String,
    required: true
  },

  options: {
    type: [String],
    required: true
  },

  testid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
    required: true
  },

  marks: {
    type: Number,
    required: true
  },

  correctOption: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }

});


const Question = mongoose.model('Question', questionSchema);
module.exports = Question;
