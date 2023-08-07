const mongoose = require('mongoose');
const { Schema } = mongoose;
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Password should be at least 6 characters long"]

    },
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true //automatically adds createdAt and updatedAt fields to the schema
});

const User = mongoose.model('User', userSchema);

module.exports = User;