'use strict';
const express = require('express');
const router = express.Router();
const util = require('util');

router.route('/tree')
  .post((req, res) => {
    // save tree data to postgres db here
    console.log(util.inspect(req.body.codeTree, { showHidden: true, depth: null, colors: true }));
    res.status(200).send('saving tree for user to postgres db');
  })
  .get((req, res) => {
    // get all tree data for user from postgres db here
    console.log('=> inside router .get/tree')
    res.status(200).send('loading all saved trees for user from postgres db');
  });

module.exports = router;
