const db = require('../models');

module.exports = function (app) {

    //GET route for index
    app.get('/', function (req, res) {
        db.Article.find({}).then(dbArticle => {
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
        axios.get("http://www.wired.com/").then((response) => {
            const $ = cheerio.load(response.data);
            const result = {};
            $(".card-component__description").each(function (i, element) {
                result.headline = $(element).text();
                result.summary = $(this).text();
                result.link = $(this).children('a').attr('href');
                console.log(result.headline);
                console.log(result.link);
                console.log(result.summary);

                db.Article.create(result)
                    .then((dbArticle) => {
                        //console.log(dbArticle);
                    }).catch(err => { res.json(err) });
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






