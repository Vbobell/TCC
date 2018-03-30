const pg = require('pg');

var config = {
  user: 'hgpcevuixibyry', //env var: PGUSER 
  database: 'd1kkdqdtoa5hn4', //env var: PGDATABASE 
  password: '23038f0ec06788e765d2a99ee8a9a574e3bf00ac67aebfee844ce21b83f6b56e', //env var: PGPASSWORD 
  host: 'ec2-54-243-63-13.compute-1.amazonaws.com', // Server hosting the postgres database 
  port: 5432, //env var: PGPORT 
  idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed 
};

var localConfig = {
  user: 'postgres', //env var: PGUSER 
  database: 'schooltasks', //env var: PGDATABASE 
  password: 'bobel9360', //env var: PGPASSWORD 
  host: 'localhost', // Server hosting the postgres database 
  port: 5432, //env var: PGPORT 
  idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed 
};
 
const pool = new pg.Pool(process.env.PORT != undefined ? config : localConfig);

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