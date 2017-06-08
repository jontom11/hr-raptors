'use strict';
const express = require('express');
const router = express.Router();

router.route('/tree')
  .get((req, res) => {
    // save to postgres here
    console.log('=> in the correct route: /postgres/save');
    res.status(200).send('saving tree to postgres db');
  });


module.exports = router;
