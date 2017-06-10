'use strict';
const express = require('express');
const router = express.Router();
const util = require('util');
const pg = require('pg');
const connectionString = process.env.DATABASE_URL;
const client = new pg.Client(connectionString);
client.connect();
const Promise = require('bluebird');
const moment = require('moment');

// create DB 
pg.connect(connectionString, (err, client, done) => {
  if (err) {
    done();
    return res.status(500).json({success: false, fatal: err}); 
  } else {
    client.query('CREATE TABLE IF NOT EXISTS test1 (id serial unique primary key, profile_id int, time_stamp text, project_name text, object text, foreign key (profile_id) references profiles(id))');
  }
});


router.route('/tree')
  .post((req, res) => {
    let results = [];

    console.log('POSTGRES SAVING CODETREE DATA:', req.body.codeTree, 'USERNAME:', req.body.userData);

    // Connect to postgres 
    pg.connect(connectionString, (err, client, done) => {

      if (err) { 
        done();
        console.log('error on get Data', err);
        return res.status(500).json({success: false, fatal: err}); 
      } else {

        // Post and Query Postgres DB
        // console.log('POSTGRES SAVING CODETREE DATA:', req.body.codeTree)
        var object = JSON.stringify(req.body.codeTree);

        // Must pull user_id by fetch_user from user_action, but for now, user_id = 1;
        // Must fetch project_name, for now project_name = 'HR test'
        var user_id = 1;  
        var project_name = 'HR test';
        var time_stamp = moment().format('MMMM Do YYYY, h:mma');
        client.query("insert into test1 (profile_id, time_stamp, project_name, object) values('" + user_id + "', '" + time_stamp + "', '" + project_name + "', '" + object + "')");
      }
      res.status(200).send('saving tree for user to postgres db');
    });

  
  })
  .get((req, res) => {
    let results = [];
    // get all tree data for user from postgres db here

    pg.connect(connectionString, (err, client, done) => {
      if (err) { 
        done();
        console.log('error on get Data', err);
        return res.status(500).json({success: false, fatal: err}); 
      } else {
        // Must pull user_id from auth login
        var user_id = 1;
        const query = client.query("select profiles.email, test1.time_stamp, test1.project_name, test1.object from profiles join test1 on profiles.id = test1.profile_id where test1.profile_id ='"+user_id+"'");
        query.on('row', (row) => {
          results.push(row); 
          console.log("resSend RESULTS:", row);        
        });
        var resSend = function() {
          res.status(200).send(JSON.stringify(results));
        };
        setTimeout(()=> resSend(), 500); 
      }
      // res.status(200).send('loading all saved trees for user from postgres db');
    });


  //   console.log('HELERJHELRHELHRKEHJR#####################')
  //   var user_id = 1;
  //   const query = client.query("select profiles.email, test1.time_stamp, test1.project_name, test1.object from profiles join test1 on profiles.id = test1.profile_id where test1.profile_id ='"+user_id+"'");
  //   query.on('row', (row) => {
  //     results.push(row); 
  //     console.log("resSend RESULTS:", row);        
  //   });
  //   var resSend = function() {
  //     res.status(200).send(JSON.stringify(results));
  //   };
  
  });
  
module.exports = router;

// DB queriers below.... DELETE when finished with project. 
// select profiles.email, test5.object from profiles join test5 on profiles.id = test5.profile_id where test5.profile_id = 1;
// select profiles.email, test6.project_name, test6.object from profiles join test6 on profiles.id = test6.profile_id where test6.profile_id ='"+user_id+"';
//  select profiles.email, test5.object from profiles join test5 on profiles.id = test5.profile_id where test5.profile_id = ('1');
