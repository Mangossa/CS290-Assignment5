/*
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name: Edward Nicolas Sarmiento  
 * Email: sarmiene@oregonstate.edu
 */

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var handlebarsLayouts = require('handlebars-layouts'); // Add this line

var app = express();
var port = process.env.PORT || 3000;

// Use static files from the 'static' folder
app.use(express.static('static'));

// Set up Handlebars as the view engine and specify the layout folder
app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main',  // 'main' is the default layout (main.handlebars)
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    helpers: handlebarsLayouts  // Add this line to register handlebars-layouts
}));

// Set Handlebars as the view engine for the app
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

var postData = require('./postData.json');

// Route for the homepage (list of all posts)
app.get('/', function (req, res) {
    res.status(200).render('postPage', { posts: postData });
});

// Route for individual posts
app.get('/posts/:id', function (req, res) {
    var id = parseInt(req.params.id);
    if (id >= 0 && id < postData.length) {
        res.status(200).render('singlePost', postData[id]);
    } else {
        res.status(404).render('404');
    }
});

// Default 404 route
app.get('*', function (req, res) {
    res.status(404).render('404');
});

// Start the server
app.listen(port, function () {
    console.log("== Server is listening on port", port);
});
