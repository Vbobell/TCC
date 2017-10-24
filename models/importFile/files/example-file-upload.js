var fileUpload = require('express-fileupload');
var fs = require('fs');
const aws = require('aws-sdk');
aws.config.region = 'us-east-2';
const S3_BUCKET = process.env.S3_BUCKET_NAME;
app.use(fileUpload());
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
    console.log(file.toString('utf8'));
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
        Bucket: S3_BUCKET,
        Key: fileName
      };
      var file = fs.createWriteStream('models/importFile/files/admin.csv');
      s3.getObject(returnData, (err, dataObject) => {
        if (err) console.log(err);
        console.log(dataObject.Body.toString('utf8'));
        file.write(dataObject.Body);
        var controller = new ControllerImport('admin','models/importFile/files/admin.csv');
        controller.csvInsertData(callback => {
          res.write('passou');
          res.end();      
        });
      });
    });
  });