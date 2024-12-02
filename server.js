/*
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name: Edward Nicolas Sarmiento  
 * Email: sarmiene@oregonstate.edu
 */


var path = require('path')
var express = require('express')
var exphbs = require('express-handlebars')

var app = express()
var port = process.env.PORT || 3000


app.use(express.static('static'))


app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))


var postData = require('./postData.json')

// Route for the homepage (list of all posts)
app.get('/', function (req, res) {
    res.status(200).render('postPage', { posts: postData })
})

// Route for individual posts
app.get('/posts/:id', function (req, res) {
    var id = parseInt(req.params.id)
    if (id >= 0 && id < postData.length) {
        res.status(200).render('singlePost', postData[id])
    } else {
        res.status(404).render('404')
    }
})

// Default 404 route
app.get('*', function (req, res) {
    res.status(404).render('404')
})

// Start the server
app.listen(port, function () {
    console.log("== Server is listening on port", port)
})
