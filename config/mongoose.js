const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/codial_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to the Database"));

db.once("open", function() {
    console.log('Connected to the Database :: MongoDB');
});

module.exports = db;