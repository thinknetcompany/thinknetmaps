/* eslint-disable */
const AWS = require('aws-sdk');

let s3 = null;

const createConnection = (key) => {
    const { AWS_ACCESS_KEY,AWS_SECRET_ACCESS_KEY,AWS_REGION} = key
    if (!s3) {
        const awsOptions = {
            accessKeyId: AWS_ACCESS_KEY,
            secretAccessKey: AWS_SECRET_ACCESS_KEY,
            region: AWS_REGION,
        };
        s3 = new AWS.S3(awsOptions);
    }
    return s3;
};

const destroyConnection = () => {
    s3 = null;
    return s3;
};

const awsUtils = {
    createConnection,
    destroyConnection,
};

module.exports = awsUtils;
