const db = require('../models');
//const Article = require('../models/Article.js')

module.exports = (app) => {

    //GET route for index
    app.get('/', function (req, res) {
        res.render('index');
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
                result.headline = $(this).text();
                result.link = $(this).children('a').attr('href');
                // console.log(result.headline);
                // console.log(result.summary);
                // console.log(result.link);

                db.Article.create(result)
                    .then((dbArticle) => { }).catch(err => { res.json(err) });
            });
            res.redirect("/");
        });
    });

    //route to display articles
    app.get('/articles', (req, res) => {
        db.Article.find({}).sort({_id: -1}).exec((err, dbArticle) => {
            if(err) {
                console.log(err);
            } else {
                const hbsObject = {
                    article: dbArticle
                };
                res.render('index', hbsObject);
                console.log(hbsObject);
            };
        });
    });

    //get articles into JSON
    app.get("/articles-json", (req, res) => {
        db.Article.find({}, function (err, doc) {
            if (err) {
                console.log(err);
            } else {
                res.json(doc);
            }
        })
    })

    //route to get one article

    //route to delete article

    //route to display comments

    //route to add comment

    //route to delete comment

};
