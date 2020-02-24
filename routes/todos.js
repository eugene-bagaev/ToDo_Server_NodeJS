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
    res.send('GET /api/notes');
});

router.post('/', function (req, res, next) {
    console.log('Req: ', req.body);
    console.log('Res: ', req.query);
    res.send('POST /api/notes');
});

module.exports = router;