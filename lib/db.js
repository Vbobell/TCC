const pg = require('pg');

var config = {
  user: 'postgres', //env var: PGUSER 
  database: 'schooltasks', //env var: PGDATABASE 
  password: 'bobel9360', //env var: PGPASSWORD 
  host: '127.0.0.1', // Server hosting the postgres database 
  port: 5432, //env var: PGPORT 
  idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed 
};

var localConfig = {
  user: 'postgres', //env var: PGUSER 
  database: 'schooltasks', //env var: PGDATABASE 
  password: 'bobel9360', //env var: PGPASSWORD 
  host: '127.0.0.1', // Server hosting the postgres database 
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
