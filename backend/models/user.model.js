const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        unique: false,
        trim: true,
    },
    lastName:{
        type: String,
        required: false,
        unique: false,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 3
    },
    gender: {
        type: Number,
        required: true,
        unique: false,
        trim: true,
    },
    birthdate: {
        type: Date,
        required: true,
        unique: false,
        trim: true,
    },
    country: {
        type: String,
        required: true,
        unique: false,
        trim: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: false,
        trim: true,
    },
},{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;