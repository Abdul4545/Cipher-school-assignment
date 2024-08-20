const express = require("express");
const { addQuestion, getQuestions } = require("../controller/questionController");


const questionRouter = express.Router();

questionRouter.get("/", getQuestions)
questionRouter.post("/add", addQuestion)

module.exports = questionRouter;