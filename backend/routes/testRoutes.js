const express = require('express');
const { getQuestions, createTest, getTestWithQuestions } = require('../controller/testController'); 
const router = express.Router();

router.get('/getquestions', getQuestions);

// POST route to create a new test
router.post('/createtest', createTest);

// get a specific test using its id
router.get("/tests/:testId", getTestWithQuestions)

module.exports = router;
