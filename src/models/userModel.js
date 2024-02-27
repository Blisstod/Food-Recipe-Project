const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now
    },
    deletionDate: {
        type: Date
    },
    isAdmin: {
        type: Boolean,
        default: false
    },

});

const deletedUserSchema = new mongoose.Schema ({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date
    },
    updateDate: {
        type: Date,
        default: Date.now
    },
    deletionDate: {
        type: Date,
        required: true
    }
})

const User = mongoose.model('User', userSchema);
const DeletedUser = mongoose.model('DeletedUser', deletedUserSchema);

module.exports = { User, DeletedUser };