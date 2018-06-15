const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const logger = require('morgan');
const mongoose = require('mongoose');
//const db = require('./models');

//create port
const app = express();
const PORT = process.env.PORT || 8080

//import public folder
app.use(express.static('public'));

//use morgan
app.use(logger('dev'));

//bodyparser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//handlbars
app.engine('handdlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//mongoose
//mongoose.connect('mongod://localhost')

//scrapers
const axios = require('axios');
const cheerio = require('cheerio');

//set up routes


//start server
app.listen(PORT, function(){
    console.log('server listening on localhost: ' + PORT);
})