/* eslint-disable */
const fs = require('fs');
const path = require('path');
const awsUtils = require('./awsUtils');

const uploadData = (dataInfo,key,AWS_BUCKET) => {
    const { version, type } = dataInfo;
    if(!version){
        console.error('version is required')
    } else if(!type) {
        console.error('type is required')
    } else {
        const s3 = awsUtils.createConnection(key);
        const filePath = path.join(__dirname, `../../../../dist/thinknetmaps.${type}`);
    
        fs.readFile(filePath, (error, fileContent) => {
            if (error) { throw error; }
            const params = {
                Body: fileContent,
                Bucket: AWS_BUCKET,
                Key: `thinknet-maps/${version}/${type}/thinknetmaps.${version}.min.${type}`,
            };
    
            s3.putObject(params, (error) => {
                if (error) {
                    console.error(error);
                    return false;
                }
                console.info(`Success to upload file thinknetmaps.${version}.min.${type} version ${version} to s3`);
                return true;
            });
        });
    }
};

module.exports = uploadData
