'use strict';
const express = require('express');
const router = express.Router();
const util = require('util');
const pg = require('pg');
const connectionString = process.env.DATABASE_URL;
const Promise = require('bluebird');
const moment = require('moment');
const passport = require('../middleware/passport');
const middleware = require('../middleware');


// create DB once server Starts
pg.connect(connectionString, (err, client, done) => {
  if (err) {
    done();
    return res.status(500).json({success: false, fatal: err}); 
  } else {
    client.query('CREATE TABLE IF NOT EXISTS test1 (id serial unique primary key, profile_id int, time_stamp text, project_name text, object text, foreign key (profile_id) references profiles(id))');
  }
});

router.route('/tree')
  .post(middleware.auth.verify, (req, res) => {
    console.log('USER IN AUTH.JS:', 'user_id:',req.user.id, 'user_email:',req.user.email);
    pg.connect(connectionString, (err, client, done) => {
      if (err) { 
        done();
        console.log('error on get Data', err);
        return res.status(500).json({success: false, fatal: err}); 
      } else {

        // Post and Query Postgres DB
        var user_id = req.user.id;  
        var time_stamp = moment().format('MMMM Do YYYY, h:mma');
        var project_name = req.body.projectName;
        var object = JSON.stringify(req.body.codeTree);

// ######################################

        // determine if project name already exists
        const nameExists = client.query("select id from test1 where project_name = '" + project_name + "'");
        var name;
        nameExists.on('row', (row)=>name = row);
        var log = function() { console.log('NAME EXISTS:', name);  };
        console.log('WHATS THE NAMEEEEEEEE', name);

        setTimeout(()=>log(), 200);
          // if yes, let them know they will override
          // if they agree, override db data
          // if not agree, request new name
// ######################################

        client.query("insert into test1 (profile_id, time_stamp, project_name, object) values('" + user_id + "', '" + time_stamp + "', '" + project_name + "', '" + object + "')");
      }
      res.status(200).send('saving tree for user to postgres db');
    });
  })

  // new get request vvvvvv that calls for user ID first, then inserts to DB
  .get(middleware.auth.verify, (req, res) => {
    var user_id = req.user.id;
    console.log('This will surely work my companion:', user_id, 'Email:', req.user.email);

    let results = [];
      // get all tree data for user from postgres db here
    pg.connect(connectionString, (err, client, done) => {
      if (err) { 
        done(); 
        console.log('error on get Data', err);
        return res.status(500).json({success: false, fatal: err}); 
      } else {
        const query = client.query("select profiles.email, test1.time_stamp, test1.project_name, test1.object from profiles join test1 on profiles.id = test1.profile_id where test1.profile_id ='"+user_id+"'");
        
        query.on('row', (row) => {
          results.push(row); 
          console.log("resSend RESULTS:", row);        
        })
          res.status(200).send(JSON.stringify(results))
        
        // res.status(200).send(JSON.stringify(results))
          
          // res.status(200).send()
        // var resSend = function() {
        //   res.status(200).send(JSON.stringify(results));
        //   // res.status(200).send('results');
        // };
        // setTimeout(()=> resSend(), 500); 
      }
    });
  });

module.exports = router;

// DB queriers below.... DELETE when finished with project. 
// select profiles.email, test5.object from profiles join test5 on profiles.id = test5.profile_id where test5.profile_id = 1;
// select profiles.email, test6.project_name, test6.object from profiles join test6 on profiles.id = test6.profile_id where test6.profile_id ='"+user_id+"';
//  select profiles.email, test5.object from profiles join test5 on profiles.id = test5.profile_id where test5.profile_id = ('1');
