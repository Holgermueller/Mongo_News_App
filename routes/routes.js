const db = require('../models');

module.exports = (app) => {

    //GET route for index
    app.get('/', function (req, res) {
        db.Article.find({}).then(dbArticle => {
            let hbsObject = {
                articles: dbArticle
            };
            res.render('index', hbsObject);
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
            $(".card-component__description").each( function (i, element) {
                result.headline = $(element).text();
                result.summary = $(this).text();
                result.link = $(this).children('a').attr('href');
                console.log(result.headline);
                console.log(result.summary);
                console.log(result.link);

                db.Article.create(result)
                    .then((dbArticle) => {
                    }).catch(err => {res.json(err)});
            });
            res.redirect("/");
        });
    });

    //route to display articles
    app.get('/scrape', (req, res) => {
        db.Article.find().sort({ _id: -1 })
            .exec((err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    let artcl = { article: res };
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
