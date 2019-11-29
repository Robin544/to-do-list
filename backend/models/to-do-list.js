const mongoose = require('mongoose')
require('./users')

const todoListSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    taskName: {
        type: String,
        required: true
    },
    taskNote: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    hours: {
        type: Number,
        required: true
    },
    minutes: {
        type: Number,
        required: true
    },
    seconds: {
        type: Number,
        required: true
    },
    status: {
        type: String, default: 'Not Activated'
    },
    // startTime: {
    //     type: Date
    // },
    // endTime: {
    //     type: Date
    // },
},
{
    timestamps: true
})

module.exports = mongoose.model('todoList', todoListSchema)