const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const logger = require('morgan');
const mongoose = require('mongoose');

//create port
const app = express();
const PORT = process.env.PORT || 8080

//import public folder
app.use(express.static('public'));

//use morgan
app.use(logger('dev'));

//bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//handlbars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//mongoose
mongoose.connect('mongodb://localhost/ArticleScraper');
//mongoose.connect('mongod://herokustuff');

const db = require('./models');

//Routes for scraper

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


//start server
app.listen(PORT, function () {
	console.log('server listening on localhost: ' + PORT);
});