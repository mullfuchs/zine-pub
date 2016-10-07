var express = require('express');
var Zine = require('../models/zine');
var cloudinary = require('cloudinary');

//process.env.CLOUDINARY_URL
var multer = require('multer');
var upload = multer({dest: './uploads/'});
var cloudinary = require('cloudinary');

var fs = require('fs');
var mongoose = require('mongoose');

var router = express.Router();


router.route('/')
  .get(function(req, res) {
    Zine.find(function(err, zines) {
      if (err) return res.status(500).send(err);
      return res.send(zines);
    });
  })
  .post(function(req, res) {
    console.log('post attempt');

    //  read_stream.pipe(writestream);
    // console.log(req);

    Zine.create(req.body, function(err, zines) {
      if (err) return res.status(500).send(err);
      return res.send(zines);
    });
  });

router.get('/:id', function(req, res) {
  Zine.findById(req.params.id, function(err, user) {
    if (err) return res.status(500).send(err);

    return res.send(user);
  });
});

router.post('/addpage', function(req, res){

    // Zine.findAndModify(req.body, function(err, zines) {
    //   if (err) return res.status(500).send(err);
    //   return res.send(zines);
    // });
    console.log(req.body);
   // console.log(req.body.newPage);
    // Zine.findAndModify({query: {id: req.body.zine._id},
    //   update: {$push: {pages: req.body.newPage}},
    //   upsert: true
    // });

});

module.exports = router;