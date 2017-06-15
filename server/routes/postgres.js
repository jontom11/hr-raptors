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
const Pgb = require('pg-bluebird');
var pgb = new Pgb();
var connects;


// create table below. 
pgb.connect(connectionString)
  .then(function(connection) {
    connects = connection;
    return connection.client.query('CREATE TABLE IF NOT EXISTS test1 (id serial unique primary key, profile_id int, time_stamp text, project_name text, object text, description text, foreign key (profile_id) references profiles(id))');
  })
  .then(function(result) {
    // close postgres connection
    connects.done();
  })
  .catch(function(error) {
    return error;
  });

router.route('/tree')
  .post(middleware.auth.verify, (req, res) => {

    // Post and Query Postgres DB
    var user_id = req.user.id;
    var time_stamp = moment().format('MMMM Do YYYY, h:mma');
    var project_name = req.body.projectName;
    var object = JSON.stringify(req.body.codeTree);
    var description = req.body.projectDescription;
    var cnn;
    // connect to postgres db for post request
    pgb.connect(connectionString) 
      .then (function(connection) {
        cnn = connection;
        var uniqueID = connection.client.query("select id from test1 where project_name = '" + project_name + "'");
        return uniqueID;
      })
      .then(function(uniqueID) {
        // uniqueID.rows will return an array of 1 length if project name exists. 
        if (uniqueID.rows.length === 1) {
          throw 'POST ERROR';
          cnn.done();
        } else {
          return cnn.client.query("insert into test1 (profile_id, time_stamp, project_name, object, description) values('" + user_id + "', '" + time_stamp + "', '" + project_name + "', '" + object + "', '" + description + "')");
        }
      })
      .then(function() {
        cnn.done();
        res.status(200).send(JSON.stringify(project_name));
      })
      .catch(function(error) {
        console.log('ERROR ON SERVER-SIDE POST REQUEST!', error);
        cnn.done();        
        res.status(500).send(error);
      });
  })

  //  get request calls for user ID first, then inserts to DB
  .get(middleware.auth.verify, (req, res) => {
    var user_id = req.user.id;
    var cnn;
    pgb.connect(connectionString)
      .then (function(connection) {
        cnn = connection;
        const query = cnn.client.query("select profiles.email, test1.time_stamp, test1.project_name, test1.object, test1.description from profiles join test1 on profiles.id = test1.profile_id where test1.profile_id ='" + user_id + "'");
        return query;
      })
      .then(function(query) {
        var resData = {user_name: req.user.display, query_rows: query.rows};
        return resData;
      })
      .then(function(responseData) {
        cnn.done();
        res.status(200).send(JSON.stringify(responseData));
      })
      .catch(function(error) {
        console.log('ERROR ON SERVER-SIDE GET REQUEST!', error);
        cnn.done();
        return res.status(500).json({success: false, fatal: err}); 
      });
  });

module.exports = router;

