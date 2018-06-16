const express = require('express');
const router = express.Router();
//const path = require('path');
//require models
const db = require('../models');

//scrapers
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = function(app){

    //GET route
    router.get('/', function(req, res){
        db.Article.find({}).then(function(){
            let hbsObject = {
                article:dbArticles
            }
        });
        res.render('index', hbsObject);
    });
    
    //route to scrape articles

    
    //route to get one article

    //route to delete article

    //route to display comments
    router.get('/', function(req, res){

    });
    
    //route to add comment
    
    //route to delete comment

//final brace of module export    
};

module.exports = router;