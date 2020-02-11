var mclient = require('mongodb').MongoClient;
var dburl = 'mongodb://46.101.211.139:27017/';

module.exports.connect = function connect(callback) {
    mclient.connect(dburl, function(err, client){
        console.log('Connected to Mongo DB');
        const db = client.db('todo');
        module.exports.db = db;
        callback(err);
    });
};
