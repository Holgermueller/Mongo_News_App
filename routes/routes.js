const express = require('express');
const router = express.Router();
const path = require('path');
//require models
const db = require('../models');

//scrapers
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = function(app){
    //GET route
    router.get('/', function(req, res){
        res.send('index')
    });
    
    //route to scrape articles
    
    //route to get one article
    
    //route to add note
    
    //

//final brace of module export    
};

module.exports = router;