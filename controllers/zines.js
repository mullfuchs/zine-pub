var express = require('express');
var Zine = require('../models/zine');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    Zine.find(function(err, zines) {
      if (err) return res.status(500).send(err);
      //console.log("zines ", zines);
      return res.send(zines);
    });
  })
  .post(function(req, res) {
    Zine.create(req.body, function(err, zines) {
      if (err) return res.status(500).send(err);
      return res.send(zines);
    });
  });

module.exports = router;