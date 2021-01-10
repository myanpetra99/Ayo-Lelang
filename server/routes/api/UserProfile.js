const express = require('express')
const router = express.Router()
const Users = require('../../models/UserSchema')
const verifyToken = require('../../middleware/verifyToken');


router.get('/user', verifyToken ,async (req,res)=>{
   try {
    const user = await Users.findOne({_id: req.user._id})
    res.status(200).send(user)
   } catch (error) {
       console.log(error)
       res.sendStatus(400)
   }
});


module.exports = router