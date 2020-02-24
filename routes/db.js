const mclient = require('mongodb').MongoClient;
const dburl = 'mongodb://46.101.211.139:27017/';
const mongoConnectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

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

module.exports.connect = function connect(callback) {
    mclient.connect(dburl, mongoConnectionParams, function(err, client){
        console.log('Connected to Mongo DB');
        const db = client.db(constants.databases.TODO);
        module.exports.db = db;
        callback(err);
    });
};
module.exports.constants = constants;
