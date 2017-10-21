var express = require('express');
var fileUpload = require('express-fileupload');
const aws = require('aws-sdk');
aws.config.region = 'us-east-2';
const S3_BUCKET = process.env.S3_BUCKET_NAME;
var app = express();
var ControllerImport = require('./controller/importFile/controller-import');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(fileUpload());

app.set('views', __dirname + '/views');
app.set('controller', __dirname + '/controller');
app.set('view engine', 'ejs');

app.get('/import/*', function(request, response){
  var controller = new ControllerImport(request.params[0],'models/importFile/CSV/test.csv');
  controller.csvInsertData(callback => response.json({"csv" : callback}));
});

app.get('/view/importAdmin', function(request, response){
  response.render('pages/admin/import/import-admin');
});

/*app.post('/upload', function(req, res) {
  var csv = req.files.csv;
  console.log(csv);
  csv.mv(__dirname + '/models/importFile/files/admin/' + csv.name, function(err) {
    if (err){
      return res.status(500).send(err);
    }Test update file bucket
  });
});*/

app.post('/upload', (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.files.csv.name;
  const file = req.files.csv.data;
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Body: file
  };
  s3.upload(s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



 




