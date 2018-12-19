/* eslint-disable */
const readline = require('readline');
const uploadData = require('./lib/connectAWS/uploadData')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let AWS_ACCESS_KEY
let AWS_SECRET_ACCESS_KEY
let AWS_REGION
let AWS_BUCKET

rl.question('What your AWS Access Key : ', async (answer) => {
    AWS_ACCESS_KEY = answer
    await rl.question('What your AWS Secret Access Key : ', async (answer) => {
      AWS_SECRET_ACCESS_KEY = answer
      await rl.question('What your AWS Region : ', async (answer) => {
        AWS_REGION = answer
        await rl.question('What your AWS Bucket : ', async(answer) => {
          AWS_BUCKET = answer
          await rl.close();
          UploadLibToS3()
        });
      });
    });
  });

const UploadLibToS3 = async() =>{
  const version = process.env.npm_package_version
  const key = {
    AWS_ACCESS_KEY: AWS_ACCESS_KEY,
    AWS_SECRET_ACCESS_KEY: AWS_SECRET_ACCESS_KEY,
    AWS_REGION: AWS_REGION
  }
  uploadData({ type:'css',version:version },key,AWS_BUCKET)
  uploadData({ type:'js',version:version },key,AWS_BUCKET)
}

