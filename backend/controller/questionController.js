
const Question = require('../model/questionModel');
const UserModel = require("../model/userModel")


const addQuestion = async (req, res) => {
  try {
    const { question, options, testid, marks, correctOption } = req.body;

    const newQuestion = new Question({
      question,
      options,
      testid,
      marks,
      correctOption
    });

    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getQuestions = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email' });
    }

    // Verify the provided password with the hashed password
    const isPasswordValid = await user.verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // If user is authenticated, retrieve all questions
    const questions = await Question.find({}, 'question options');

    // Send the questions as a response
    res.status(200).json(questions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { addQuestion, getQuestions }