/**
 * Module dependencies.
 */

const express = require('express');
const logger = require('morgan');
const path = require('path');
const router = express.Router();
const app = express();
var performance = require('perf_hooks');

// log requests
app.use(logger('dev'));

// set us to use JSON, but, here, in this app, we want to use html, so we leave this commented out
// if we uncomment it, we will be unable to serve html files and express stops speaking 'html' and speaks 'json' instead
// which would cause a brownser to not get the <head> or other required tags to properly form a html document
// app.use(express.json());


// express on its own has no notion
// of a "file". The express.static()
// middleware checks for a file matching
// the `req.path` within the directory
// that you pass it. In this case "GET /js/app.js"
// will look for "./public/js/app.js".

app.use(express.static(path.join(__dirname, 'public')));

// if you wanted to "prefix" you may use
// the mounting feature of Connect, for example
// "GET /static/js/app.js" instead of "GET /js/app.js".
// The mount-path "/static" is simply removed before
// passing control to the express.static() middleware,
// thus it serves the file correctly by ignoring "/static"
app.use('/static', express.static(path.join(__dirname, 'public')));

// if for some reason you want to serve files from
// several directories, you can use express.static()
// multiple times! Here we're passing "./public/css",
// this will allow "GET /style.css" instead of "GET /css/style.css":

app.use(express.static(path.join(__dirname, 'public', 'css')));
app.use(express.static(path.join(__dirname, 'public', 'js')));
app.use(express.static(path.join(__dirname, 'public', 'html')));



// Notice I use router here, not app
// This is because I am using app to serve static files from the public folder
// and i deviced to use the router to setup my API


// Examples of building a simple API to carry out simple functions
router.get('/add/:num1/:num2', function (req, res) {
  var num1 = parseInt(req.params.num1)
  var num2 = parseInt(req.params.num2)
  var sum = (num1 + num2).toString()
  res.send(sum)
})

router.get('/subtract/:num1/:num2', function (req, res) {
  var num1 = parseInt(req.params.num1)
  var num2 = parseInt(req.params.num2)
  var difference = (num1 - num2).toString()
  res.send(difference)
})

router.get('/multiply/:num1/:num2', function (req, res) {
  var num1 = parseInt(req.params.num1)
  var num2 = parseInt(req.params.num2)
  var product = (num1 * num2).toString()
  res.send(product)
})

router.get('/divide/:num1/:num2', function (req, res) {
  var num1 = parseInt(req.params.num1)
  var num2 = parseInt(req.params.num2)
  var quotient = (num1 / num2).toString()
  res.send(quotient)
})

router.get('/test/isPrime/:number', function (req, res)
{
var start = Date.now();
var finish = undefined;

if (req.params.number===1)
  {
   finish = Date.now() -start;
    var sendBack = [false,finish]
    res.send(sendBack);
  }
  else if(req.params.number === 2)
  {
   finish = Date.now() -start;
   var sendBack = [true,finish]
   res.send(sendBack);
  }else
  {
    for(var x = 2; x < req.params.number; x++)
    {
      if(req.params.number % x === 0)
      {
        finish = Date.now() -start;
	var sendBack = [false,finish]
        res.send(sendBack);
	return;
      }
    }
   finish = Date.now() -start;
   var sendBack = [true,finish]
    res.send(sendBack);
  }
})







// and after all that I make them accessable under API
// bundle all the routers under API
app.use("/api", router);

// start my application listening
app.listen(3000);

console.log('listening on port 3000');
console.log('try:');
console.log('  GET /hello.txt');
console.log('  GET /js/app.js');
console.log('  GET /css/style.css');
