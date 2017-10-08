const pg = require('pg');
//var config = 'postgres://szjrxhnyhfdvog:375e1eaae56772ecf7ba1b1ac4522552999b8f45458a4f99d6552da8a72221d4@ec2-107-22-250-33.compute-1.amazonaws.com:5432/d15ia3a4j471m';
var config = {
  user: 'szjrxhnyhfdvog', //env var: PGUSER 
  database: 'd15ia3a4j471m', //env var: PGDATABASE 
  password: '375e1eaae56772ecf7ba1b1ac4522552999b8f45458a4f99d6552da8a72221d4', //env var: PGPASSWORD 
  host: 'ec2-107-22-250-33.compute-1.amazonaws.com', // Server hosting the postgres database 
  port: 5432, //env var: PGPORT 
  idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed 
};
 
const pool = new pg.Pool(config);
 
pool.on('error', function (err, client) {
  console.error('idle client error', err.message, err.stack);
});

module.exports.query = function (text, values, callback) {
  console.log('query:', text, values);
  return pool.query(text, values, callback);
};
 
module.exports.connect = function (callback) {
  return pool.connect(callback);
};