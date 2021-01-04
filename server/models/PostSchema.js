const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    image:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    startPrice:{
        type: Number,
        required: true
    },
    nextBid:{
        type: Number,
        required: true
    },
    startTime:{
        type: String,
        required: true,
    },
    endTime:{
        type: String,
        required: true,
    },
    user:{
        type: String
    },
    currentPrice:{
        type: Number
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Post',postSchema);