/*
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name: Edward Nicolas Sarmiento  
 * Email: sarmiene@oregonstate.edu
 */

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const hbsLayouts = require('handlebars-layouts'); // Import handlebars-layouts

const app = express();
const port = process.env.PORT || 3000;

// Register the handlebars-layouts helpers to make them available in your templates
const hbs = exphbs.create({
  helpers: hbsLayouts
});

app.engine('handlebars', hbs.engine); // Register Handlebars with express
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('static'));

// Your postData or any other data you might be using
var postData = require('./postData.json');

// Routes
app.get('/', function (req, res) {
  res.status(200).render('postPage', { posts: postData });
});

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
