'use strict';
const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const util = require('util');


router.route('/tree')
  .post((req, res) => {
    // save to postgres db here

    console.log(util.inspect(req.body.codeTree, { showHidden: true, depth: null, colors: true }));

    res.status(200).send('saving tree to postgres db');
=======
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
<<<<<<< HEAD
    })
>>>>>>> reading and writing to local database
=======
    });
>>>>>>> correcting spacing/indent issues
  });
  // .post((req, res) => {
  //   // save to postgres here
  //   const results = [];
  //   console.log('=> in the correct route POST: /postgres/save');
  //   res.status(200).send('posting tree to postgres db');
  //   // ###########################################################
  //   // Connecting to DB
  //   // get a postgres client from the connection pool
  //   pg.connect(connectionString, (err,client,done) => {
  //     if (err) {
  //       done();
  //       console.log('Error on post request!', err)
  //       return res.status(500).json({success: false, fata: err});
  //     }
  //     // query > insert data
  //     client.query('INSERT INTO objecttext values (username, "html")');
  //     // query > pull data
  //     const query = client.query('SELECT * FROM objecttext');
  //     // return results one row at a time
  //     query.on('row', (row) => { 
  //       results.push(row); 
  //     });
  //     // after data has returne, close connection and return results
  //     query.on('end', ()=>{
  //       done();
  //       return res.json(results);
  //     })
  //   })
  //   //DB query ends
  //   // ###########################################################    
  // });


module.exports = router;
