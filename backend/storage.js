const format = require('util').format;
const GoogleStorage = require('@google-cloud/storage');
const storage = GoogleStorage();

exports.uploadDishImage = (fileName, fileBuffer, callback) => {
  const bucket = storage.bucket('mychef-123.appspot.com');
  const blob = bucket.file(fileName);
  const blobStream = blob.createWriteStream();

  blobStream.on('error', (err) => {
    callback('ERROR');
  });

  blobStream.on('finish', () => {
    const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
    bucket.makePublic((err)=>{});
    callback(publicUrl);
  });

  blobStream.end(fileBuffer);
};