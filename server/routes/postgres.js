'use strict';
const express = require('express');
const router = express.Router();
const util = require('util');
const connectionString = process.env.DATABASE_URL || 'postgres://wdzzprbikqsqfm:de2d1f773276f59d4876030b7552af1cc4f2faa152f5b7cefe51dcdc1e2e5fd1@ec2-23-23-227-188.compute-1.amazonaws.com:5432/de03334hmgvgu4';
const pg = require('pg');

router.route('/tree')
  .post((req, res) => {
    let results = [];
    let answer;
    console.log('THIS IS DATA BEING SENT:', req.body);
    // save to postgres here
    console.log('=> in the wrong route GET: /postgres/save');
    // res.status(200).send(connectionString);
    pg.connect(connectionString,(err,client,done) => {
      if (err) { 
        done();
        console.log('error on get Data',err);
        return res.status(500).json({success: false, fatal: err}); 
      } else {
        client.query("`INSERT INTO postest1 values (2, ${req.body})`");
        const query = client.query('SELECT * FROM test1 where id=1');
        query.on('row', (row) => { 
          results.push(row); 
          console.log('rowwwwwwww', row);
        });
        console.log('SUCKSESSS!', query);
        res.status(200).send(req.body);  // Need to promisify to get data from query
      }
    })
  });

module.exports = router;
