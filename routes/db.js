const mongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const linkToDatabase = 'mongodb://46.101.211.139:27017/';
const mongoConnectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
let db;

const constants = {
    collections: {
        NOTE: 'note',
        WORKPLACE: 'wp',
        USER: 'user'
    },
    databases : {
        TODO: 'todo'
    }
};

function connect(callback) {
    mongoClient.connect(linkToDatabase, mongoConnectionParams, function (err, client) {
        console.log('Connected to Mongo DB');
        db = client.db(constants.databases.TODO);
        module.exports.db = db;
        callback(err);
    });
}

function saveNoteInDatabase(note, callbackFn) {
    connect(function (err) {
        if (err) {
            console.error('Error in connection to DB in save!');
        } else {
             db.collection(constants.collections.NOTE).insertOne(note, (err, results) => callbackFn(results));
        }
    });
}
function deleteNoteFromDatabase(noteId, callbackFn) {
    const detailsWithId = {
        '_id': ObjectId(noteId)
    };

    connect(function (err) {
        if (err) {
            console.error('Error in connection to DB in delete!');
        } else {
            db.collection(constants.collections.NOTE).remove(detailsWithId, (err, results) => callbackFn(results));
        }
    })
}

module.exports = {connect, constants, saveNoteInDatabase, deleteNoteFromDatabase};

