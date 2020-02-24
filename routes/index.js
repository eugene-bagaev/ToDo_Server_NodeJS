const express = require('express');
const mongo = require('../routes/db');
const router = express.Router();

const collectionWorkplace = 'wp';
const collectionUsers = 'users';
const collectionNote = 'note';

router.get('/', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
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

module.exports = router;