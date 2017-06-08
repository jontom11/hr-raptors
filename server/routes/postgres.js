'use strict';
const express = require('express');
const router = express.Router();

router.route('/saveTree')
  .post((req, res) => {
  // save to postgres
    console.log('=> in the correct route: /save');
    console.log(`Saving tree: ${req.data}`);
    res.status(201).send('Saved tree!');
  });


module.exports = router;
