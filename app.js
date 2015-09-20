var mongoose = require('mongoose');
var express = require('express'),
  app = express(),
  bodyParser = require("body-parser"),
  methodOverride = require('method-override'),
  morgan = require('morgan');
db = require("./models");

app.set('view engine', 'ejs');
app.use(morgan('combined'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true})); 
app.use(methodOverride('_method'));


app.set('view engine', 'ejs');
app.use(morgan('combined'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true})); 
app.use(methodOverride('_method'));


app.get('/', function(req,res){
  res.redirect('/countries');
});

// INDEX
app.get('/countries', function(req,res){
  db.Country.find({},function(err,countries){
    if (err) throw err;
    res.render("countries/index", {countries:countries});
  });
});

// NEW
app.get('/countries/new', function(req,res){
  res.render("countries/new");
});

// CREATE
app.post('/countries', function(req,res){
    var country = new db.Country(req.body.country);
    var cities = req.body.cities.split(", ");
    country.cities = cities;
    country.save(function(err){
      if (err) throw err;
      res.redirect('/');
    });
});

// SHOW

app.get('/countries/:id', function(req,res){
  db.Country.findById(req.params.id,function(err,country){
    if (err) throw err;
    res.render("countries/show", {country:country});
  });
});

// EDIT

app.get('/countries/:id/edit', function(req,res){
  db.Country.findById(req.params.id,function(err,country){
    if (err) throw err;
    res.render("countries/edit", {country:country});
  });
});

// UPDATE
app.put('/countries/:id', function(req,res){
  db.Country.findById(req.params.id,function(err,country){
    // loop over all keys in object
    for(var prop in req.body.country){
      country[prop] = req.body.country[prop];
    }
    country.cities = req.body.cities.split(", ");
    country.save(function(err,country){
      if (err) throw err;
      res.redirect('/');
    });
  });
});

// DESTROY
app.delete('/countries/:id', function(req,res){
    db.Country.findByIdAndRemove(req.params.id, function(err,book){
      if (err) throw err;
      res.redirect('/');
    });
});

// CATCH ALL
app.get('*', function(req,res){
  res.render('404');
});

app.listen(3000, function(){
  "Server is listening on port 3000";
});