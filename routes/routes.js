const db = require('../models');

module.exports = function(app) {

    //GET route for index
    app.get('/', function (req, res) {
        db.Article.find({}).then(function (dbArticle) {
            let hbsObject = {
                article: dbArticle
            };
            res.render('index');
        });
    });

    //route to scrape articles
//scrapers
const axios = require('axios');
const cheerio = require('cheerio');

    //route to get one article

    //route to delete article

    //route to display comments

    //route to add comment

    //route to delete comment

};




  

