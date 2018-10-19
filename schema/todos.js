const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    description: {type: String, required: true},
    isDone: {type: Boolean, required: true},
    ps: {type: String},
})

module.exports = mongoose.model('Todo', todoSchema);