'use strict';
const express = require('express');
const router = express.Router();

router.route('/tree')
  .post((req, res) => {
    // save to postgres db here
    var tree = req.body.codeTree;

    console.log('=> in the correct route POST: /postgres/save');
    console.log('REQUEST BODY: '  , tree);

    res.status(200).send('saving tree to postgres db');
  });


module.exports = router;
