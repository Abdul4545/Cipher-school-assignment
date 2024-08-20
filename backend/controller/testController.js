const TestModel = require('../model/testModel');
const Question = require('../model/questionModel');
const mongoose = require('mongoose');

const getQuestions = async (req, res) => {
    try {
        const questions = await Question.find({}, 'question');
        res.status(200).json(questions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



const createTest = async (req, res) => {
    try {
        const { title, descriptions, questions } = req.body;

        // Validate input
        if (!title || !descriptions || !Array.isArray(questions)) {
            return res.status(400).json({ error: 'Invalid input' });
        }

        // Validate question IDs
        const invalidQuestionIds = [];
        for (const id of questions) {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                invalidQuestionIds.push(id);
            } else {
                const question = await Question.findById(id);
                if (!question) {
                    invalidQuestionIds.push(id);
                }
            }
        }

        if (invalidQuestionIds.length > 0) {
            return res.status(400).json({ error: 'Invalid question IDs', invalidQuestionIds });
        }

        // Create and save the new test
        const newTest = new TestModel({
            title,
            descriptions,
            questions
        });

        const savedTest = await newTest.save();
        res.status(201).json(savedTest);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



const getTestWithQuestions = async (req, res) => {
    try {
        const { testId } = req.params;

        // Validate the testId format
        if (!mongoose.Types.ObjectId.isValid(testId)) {
            return res.status(400).json({ error: 'Invalid test ID format' });
        }

        // Find the test and populate the questions field
        const test = await TestModel.findById(testId)
            .populate('questions') // Populate all fields of the 'questions' document
            .exec();

        if (!test) {
            return res.status(404).json({ error: 'Test not found' });
        }

        res.status(200).json(test);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getTestWithQuestions };

module.exports = { getQuestions, createTest, getTestWithQuestions };
