const mongoose = require("mongoose")


const testSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    descriptions: {
        type: String,
        required: true
    },

    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }],

    isDeleted: {
        type: Boolean,
        default: false
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


const TestModel = mongoose.model('Test', testSchema);

module.exports = TestModel