const express = require('express');
const mongo = require('../routes/db');
const {constants} = require('../utils/server');
const router = express.Router();

// /api/notes route

router.get('/', function(req, res) {
    res.send('GET /api/notes');
});

router.post('/', function (req, res) {
    console.log('JSON POST body /api/notes: ', req.body);

    let result = {
        status: constants.STATUSES.SUCCESS
    };

    try {
        const noteForSave = req.body;

        const callbackFunction = function insertOneCallback(data) {
            result.data = data['ops'];
            res.send(result);
        };

        mongo.saveNoteInDatabase(noteForSave, callbackFunction);
    } catch (e) {
        console.error(e);
        result.status = constants.STATUSES.ERROR;
        res.send(result);
    }
});

router.delete('/', function (req, res) {
    if (req.query && req.query.id) {
        console.log('DELETE body /api/notes: ', req.query.id);

        let result = {
            status: constants.STATUSES.SUCCESS
        };

        try {
            const callbackFnDeleteNote = function deleteOneCallback(data) {
                result.data = data['result'];
                res.send(result);
            };

            mongo.deleteNoteFromDatabase(req.query.id, callbackFnDeleteNote);
        } catch (e) {
            console.error(e);
            result.status = constants.STATUSES.ERROR;
            res.send(result);
        }
    }
});

module.exports = router;