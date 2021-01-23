const UserSchema = require('../models/UserSchema')

module.exports = function(req, res , next){
    const user = UserSchema.findById({_id: req.user._id})

    if( user.verified == false ){
        res.sendStatus(402)
    }else{
        res.sendStatus(200)
        return next()
    }
}