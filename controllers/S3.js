const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const S3 = require("aws-sdk/clients/s3");
// const AWS = require("aws-sdk");
const fs = require("fs");
// const path = require("path");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// upload files to s3
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);
  // console.log(fileStream);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    // Key: file.filename,
    Key: `${Date.now()}+${file.originalname}`,
  };
  return s3.upload(uploadParams).promise();

  // console.log(uploadParams);
}
exports.uploadFile = uploadFile;

// download files from s3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.getObject(downloadParams).createReadStream();
}

exports.getFileStream = getFileStream;

// AWS.config.update({
//   region,
//   credentials: { accessKeyId, secretAccessKey },
// });
// const buckets = () => {
//   s3.listBuckets((err, data) => {
//     if (err) console.log(err);
//     console.log(data.Buckets);
//   });
// };

// module.exports = { AWS };
