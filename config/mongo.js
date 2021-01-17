//crypto
const crypto = require('crypto').randomBytes(256).toString('hex');

// config/mongo.js
module.exports = {

    url: 'mongodb://localhost:27017/todo',
    sceret: crypto,
    db: 'todo'
};