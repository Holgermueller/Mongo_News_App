const db = require('../models');

module.exports = (app) => {

    //GET route for index
    app.get('/', (req, res) => {
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
                // console.log(result.link);

                db.Article.create(result)
                    .then((dbArticle) => { }).catch(err => { res.json(err) });
            });
            res.redirect("/articles");
        });
    });

    //route to display articles
    app.get('/articles', (req, res) => {
        db.Article.find({}, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                let hbsObject = { articles: data };
                res.render('index', hbsObject);
                //console.log(hbsObject);
            };
        });
    });

    //get articles into JSON
    app.get("/articles-json", (req, res) => {
        db.Article.find({}).then((err, doc) => {
            if (err) {
                console.log(err);
            } else {
                res.json(doc);
            }
        });
    });

    //route to get one article, to read it
    app.get("/readArticle/:id", (req, res) => {
        db.Article.findOne({ _id: req.params.id })
            .populate('comment')
            .then(dbArticle => {
                //console.log(dbArticle);
                articleObject = { articles: dbArticle };
                res.render('article', articleObject);
            }).catch(err => {
                res.json(err);
            });
    });

    //route to save article


    //route to add comment to an article
    app.post("/comment", (req, res) => {
        db.Comment.create(req.body).then(dbComment => {
            db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { comment: dbComment._id } }, { new: true });
        }).then(dbArticle => {
            res.json(dbArticle);
            console.log(dbArticle);
        }).catch(err => {
            res.json(err);
        });
    });

    //route to delete comment


    //route to delete article
    app.get("/deleteArticle/:id", (req, res) => {
        db.Article.deleteOne({ _id: req.params.id })
            .then(dbArticle => {
                res.redirect("/articles");
            }).catch(err => {
                res.json(err);
            });
    });

};
