const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const dbToDo = 'todo';
const collectionWorkplace = 'Workplace';
const collectionNote = 'Note';
const serverIp = '46.101.211.139';
const serverPort = '27017';
const urlToDB = `mongodb://${serverIp}:${serverPort}`;

async function main(){
    let client, db;
    try{
        client = await MongoClient.connect(urlToDB, {useNewUrlParser: true});
        db = client.db(dbToDo);
        let dCollection = db.collection(collectionWorkplace);
        let result = await dCollection.find();
        // let result = await dCollection.countDocuments();
        // your other codes ....
        return result.toArray();
    }
    catch(err){ console.error(err); } // catch any mongo error here
    finally{ client.close(); } // make sure to close your connection after
}

async function getDB() {
    const promise = new Promise(function(resolve, reject){
        MongoClient.connect(urlToDB)
            .then((client) => {
                console.info('Connected to Database');
                const toDoDatabase = client.db(dbToDo);

                toDoDatabase.collection(collectionNote).find({}, function (err, result) {
                    let resultData = [];
                    result.forEach(function (item) {
                        console.log('Item: ', item);
                        resultData.push({
                            name : item.Name,
                            wp : item.Workplace,
                            items : item.Items
                        });
                    });

                    resolve(resultData);
                });
            })
            .catch((err) => {
                console.error('DATABASE GETTING ERROR');
                reject('Error database getting!');
        });
    });

    return promise;
}

async function getWps() {
    let resultData = [];
    let data = await MongoClient.connect(urlToDB, (err, client) => {

        try {
            console.log('Connected to DB');
            const toDoDatabase = client.db(dbToDo);
            let allRecords = toDoDatabase.collection(collectionNote).find({}, function (err, result) {

                result.forEach(function (item) {
                    resultData.push({
                        name : item.Name,
                        wp : item.Workplace,
                        items : item.items
                    });
                });

            });

        } catch (e) {
            console.error(e);
        }


    });
    return data;
}

/* GET home page. */
router.get('/', function(req, res, next) {
    const database = getDB().then((result) => {
        console.info(result);
        res.send(result);
    });
    console.log('DB: ', database);
    // res.send(data);
});

module.exports = router;


// const toDoDatabase = client.db(dbToDo);
//
// let resultWorkplace = [];
//
//
// let resultNote = new Promise(function (resolve, reject) {
//   let data = {};
//   let wp = [];
//   toDoDatabase.collection(collectionNote).find({}, function (err, result) {
//     result.forEach(function (item) {
//       wp.push({
//         name : item.Name,
//         wp : item.Workplace,
//         items : item.items
//       });
//     });
//   });

// let note = [];
// toDoDatabase.collection(collectionWorkplace).find({}, function (findErr, result) {
//   result.forEach(function (item) {
//     resultWorkplace.push(item.Name);
//   })
// });
//
// data.wp = wp;
// data.notes = note;
//
// resolve(data);