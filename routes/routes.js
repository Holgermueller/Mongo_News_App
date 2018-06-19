const db = require('../models');

module.exports = function (app) {

    //GET route for index
    app.get('/', function (req, res) {
        db.Article.find({}).then(function (dbArticle) {
            let hbsObject = {
                article: dbArticle
            };
            res.render('index');
        });
    });

    //scrapers
    const axios = require('axios');
    const cheerio = require('cheerio');

    //test scrape
    app.get("/scrape", function (req, res) {
        axios.get("http://www.wired.com/category/science/").then(function (response) {
            let $ = cheerio.load(response.data);
            $(".card-component__description").each(function (i, element) {
                let result = {};
                result.headline = $(this).text();
                result.summary = $(this).text();
                result.link = $(this).children('a').attr('href');
                console.log(result);

                db.Article.create(result)
                    .then(function (dbArticle) {
                        console.log(dbArticle);
                    }).catch(function (err) {
                        return res.json(err);
                    });
            });
            res.send("Scrape complete");
        });
    });

    //route to scrape articles


    //route to get one article

    //route to delete article

    //route to display comments

    //route to add comment

    //route to delete comment

};






