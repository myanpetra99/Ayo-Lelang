const mongoose = require('mongoose');
const PostSchema = require('./PostSchema');
const UserSchema = require('./UserSchema');

const chatlogSchema = new mongoose.Schema(
{
    postId : {
        type : mongoose.Types.ObjectId, ref : PostSchema
    },
    userlog : [{
        _id : {  type : mongoose.Types.ObjectId, ref : UserSchema },
        bid : { type : Number },
        bidAt : { type : Date, default : Date.now}
    }],
}
)

module.exports = mongoose.model('ChatLog',chatlogSchema);