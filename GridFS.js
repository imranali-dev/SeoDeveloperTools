const { MongoClient } = require('mongodb');
const { Readable } = require('stream');
const { GridFSBucket } = require('mongodb');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
require('dotenv').config();

async function saveImageToGridFS(db, filename, imageStream) {
    const bucket = new GridFSBucket(db);

    const uploadStream = bucket.openUploadStream(filename);
    imageStream.pipe(uploadStream);

    return new Promise((resolve, reject) => {
        uploadStream.on('finish', resolve);
        uploadStream.on('error', reject);
    });
}

async function getImageFromGridFS(db, filename) {
    const bucket = new GridFSBucket(db);

    const downloadStream = bucket.openDownloadStreamByName(filename);
    const chunks = [];

    return new Promise((resolve, reject) => {
        downloadStream.on('data', (chunk) => chunks.push(chunk));
        downloadStream.on('end', () => resolve(Buffer.concat(chunks)));
        downloadStream.on('error', reject);
    });
}

async function main() {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    const db = client.db('mydb');

    const imageStream = Readable.from('image data here');
    await saveImageToGridFS(db, 'my-image.png', imageStream);

    // To retrieve the image:
    const imageData = await getImageFromGridFS(db, 'my-image.png');
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

module.exports = {
    saveImageToGridFS,
    getImageFromGridFS
};
