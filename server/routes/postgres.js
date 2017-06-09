'use strict';
const express = require('express');
const router = express.Router();
const util = require('util');


router.route('/tree')
  .post((req, res) => {
    // save to postgres db here

    console.log(util.inspect(req.body.codeTree, { showHidden: true, depth: null, colors: true }));

    res.status(200).send('saving tree to postgres db');
  });

module.exports = router;
