'use strict';

//Module dependencies.

var express = require('express');
var fs = require("fs");
var talks = require('./routes/talks.js')( fs );

//initialize
var app = express();
var server = require('http').createServer( app );
var io = require('socket.io').listen( server );

// use livereload middleware
app.use(require('grunt-contrib-livereload/lib/utils').livereloadSnippet);


//Routes

app.get('/apitalk', talks.findAll);


app.post('/apitalk/:talkId/:controller', function(req, res){
	talks.addVote( req.query.username, req.params.talkId, req.query.vote );
	res.send("ok")
});


//exports
exports = module.exports = server;
exports.use = function() {
  app.use.apply(app, arguments);
};