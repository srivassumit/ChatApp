const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Database Connection URL
const url = '<your URL>';

const dbName = 'test';

// Use connect method to connect to the server
MongoClient.connect(url, function (err, client) {
    if (err) return process.exit(1);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    insertDocuments(db, function (r1) {
        console.log('Inserted Documents: ' + JSON.stringify(r1.result))
        findDocuments(db, function (r) {
            console.log('Found Documents: ' + JSON.stringify(r))
            client.close();
        });
    });
});

var findDocuments = function (db, callback) {
    // Get the documents collection
    var collection = db.collection('sampleCollection');

    collection.findOne({}, (e, r) => {
        if (e) console.log('find error: ' + e);
        callback(r);
    });
};

var insertDocuments = function (db, callback) {
    // Get the documents collection
    var collection = db.collection('sampleCollection');

    // Insert some documents
    collection.insertMany([
        { a: 1 }, { a: 2 }, { a: 3 }
    ], function (err, result) {
        if (err) console.log('Error: ' + err);
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
}