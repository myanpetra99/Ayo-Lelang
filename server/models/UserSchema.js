const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type : String,
        required: true
    },
    phone : {
        type : Number,
        required: true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    address : {
        province : {
            type : String
        },
        city : {
            type : String
        },
        street : {
            type : String
        },
        zip : {
            type : Number
        }
    },
    verified :{
        type : Boolean,
        default : false
    },
    createdAt : {
        type : Date,
        default : Date.now
    }      
})

module.exports = mongoose.model('User', UserSchema)