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

    //route to scrape articles
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
            res.redirect("/");
        });
    });

    //route to display articles
    app.get('/scrape', (req, res) => {
        db.Article.find().sort({_id: -1})
        .exec((err, doc) => {
            if (err) {
                console.log(err);
            } else {
                let artcl = {article: doc};
                res.render('index', artcl);
            }
        });
    });

    //route to get one article

    //route to delete article

    //route to display comments

    //route to add comment

    //route to delete comment

};






