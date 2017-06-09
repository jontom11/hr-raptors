'use strict';
const express = require('express');
const router = express.Router();
const util = require('util');
const connectionString = process.env.DATABASE_URL || 'postgres://wdzzprbikqsqfm:de2d1f773276f59d4876030b7552af1cc4f2faa152f5b7cefe51dcdc1e2e5fd1@ec2-23-23-227-188.compute-1.amazonaws.com:5432/de03334hmgvgu4';
const pg = require('pg');
const Promise = require('bluebird');


router.route('/tree')
  .post((req, res) => {
    let results = [];
    // console.log(util.inspect(req.body.codeTree, { showHidden: true, depth: null, colors: true }));
    console.log('POSTGRES SAVING CODETREE DATA:', JSON.stringify(req.body.codeTree));
    // save to postgres here
    pg.connect(connectionString, (err, client, done) => {

      if (err) { 
        done();
        console.log('error on get Data', err);
        return res.status(500).json({success: false, fatal: err}); 
      } else {
        // console.log('POSTGRES SAVING CODETREE DATA:', req.body.codeTree)
        var sth = JSON.stringify(req.body.codeTree);
        // client.query("insert into postest1 values(3,'"+sth+"')")
        const query = client.query('SELECT * FROM postest1 where id=3');

        query.on('row', (row) => {
          results.push(row.obj); 
          console.log("resSend RESULTS:", row.obj);        
        });
        // res.status(200).send('SKEEEEETT');  // Need to promisify to get data from query
        var resSend = function() {
          // console.log("resSend RESULTS:",results);
          res.status(200).send(JSON.stringify(results));
        };
        setTimeout(()=> resSend(), 500);
      }
    })
  });

module.exports = router;