const pg = require('pg');

var config = {
  user: 'eurohoncjgatsy', //env var: PGUSER 
  database: 'da3hubatr2f5it', //env var: PGDATABASE 
  password: '3a8b791ac97af8b2ed14bbcc72f83a43d71cae8fa2cd5744ea41d490b794da47', //env var: PGPASSWORD 
  host: 'ec2-107-22-162-158.compute-1.amazonaws.com', // Server hosting the postgres database 
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