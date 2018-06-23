const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let CommentSchema = new Schema({
    name: {
        type: String
    },
    comment: {
        type: String
    }
});

let Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;