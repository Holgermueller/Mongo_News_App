const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let ArticleSchema = new Schema({
    headline: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    comment: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

let Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;