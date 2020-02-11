const express = require('express');
const mongo = require('../routes/db');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const dbToDo = 'todo';
const collectionWorkplace = 'Workplace';
const collectionUsers = 'users';
const collectionNote = 'Note';
const serverIp = '46.101.211.139';
const serverPort = '27017';
const urlToDB = `mongodb://${serverIp}:${serverPort}`;

router.get('/', function(req, res, next) {
    mongo.connect(function(err){
        if (err) throw err;

        Promise.all([
            mongo.db.collection(collectionNote).find().toArray(),
            mongo.db.collection(collectionWorkplace).find().toArray(),
            mongo.db.collection(collectionUsers).find().toArray()
            ]
        )
            .then((resultAllData) => {
                res.json({
                    notes : resultAllData[0],
                    wps : resultAllData[1],
                    users : resultAllData[2]
                });
            })
            .catch((err) => {
                console.error('Err: ', err);
            });
    });

});

function getWrapperFromCursorCollectionNote(cursor) {

    return new Promise((resolve, reject) => {
        let resultData = [];
        console.log(7);

        new Promise((resolve1, reject1) => {
            cursor.each(function (err, doc) {
                if (doc) {
                    resultData.push({
                        name : doc.Name,
                        wp : doc.Workplace,
                        items : doc.Items
                    });
                }
                console.log(9);
            });
            resolve1(resultData);

        }).then((resultCursor) => {
            console.log('ResCursor: ', resultCursor);
            resolve(resultCursor);
        });


        console.log('8 Res: ',  resultData);
        resolve(resultData);
    });

}

function getCursorData(client, collection) {
    console.log(4);
    return new Promise(((resolve, reject) => {
        console.log(5);
        let resultData = [];
        const toDoDatabase = client.db(dbToDo);
        const cursor2 = toDoDatabase.collection(collection).find().toArray();
        console.log('2: ', cursor2);
        const cursor = toDoDatabase.collection(collection).find({}, function (err, doc) {
            doc.forEach(function (item) {
                if (doc) {
                    resultData.push({
                        name : item.Name,
                        wp : item.Workplace,
                        items : item.Items
                    });
                }
            });
            resolve(resultData);
        });

    }));
}

function getMongoClientPromise() {
    console.log(2);
    return MongoClient.connect(urlToDB);
}

module.exports = router;