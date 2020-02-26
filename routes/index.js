const express = require('express');
const mongo = require('../routes/db');
const router = express.Router();

router.get('/', function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    mongo.connect(function(err){
        if (err) throw err;

        Promise.all([
            mongo.db.collection(mongo.constants.collections.NOTE).find().toArray(),
            mongo.db.collection(mongo.constants.collections.WORKPLACE).find().toArray(),
            mongo.db.collection(mongo.constants.collections.USER).find().toArray()
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

router.post('/', function (req, res) {

});

module.exports = router;