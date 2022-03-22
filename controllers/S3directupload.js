const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const crypto = require("crypto");
const aws = require("aws-sdk");
const { promisify } = require("util");

const randomBytes = promisify(crypto.randomBytes);
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

const generateUploadURL = async () => {
  try {
    const rawBytes = await randomBytes(16);
    const imageName = rawBytes.toString("hex");
    console.log("image name " + imageName);
    const params = { Bucket: bucketName, Key: imageName, Expires: 60 };
    const uploadURL = await s3.getSignedUrlPromise("putObject", params);
    if (!uploadURL)
      console.log("#####################################################");
    return uploadURL;
  } catch (error) {
    console.log("********************* ERROR ********" + error.message);
  }
};
module.exports = { generateUploadURL };
