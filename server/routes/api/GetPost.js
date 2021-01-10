const express = require('express')
const router = express.Router()
const Posts = require('../../models/PostSchema')
const Chatlogs = require('../../models/ChatlogSchema')
const verifyToken = require('../../middleware/verifyToken')
const Users = require('../../models/UserSchema')

router.get('/post', async (req,res)=>{
   try {
    const allPost = await Posts.find()
    res.status(200).send(allPost)
   } catch (error) {
       console.log(error)
       res.status(400).send('Error 400 Bad Request')
   }
});

router.get('/post/:id',verifyToken ,async (req,res)=>{
    try {
     const user = await Users.findOne({_id: req.user._id})
     const aPost = await Posts.findOne({_id: req.params.id})
     const chatLogs = await Chatlogs.findOne({postId : req.params.id})
     let data = {}
     data.post = aPost
     data.chat = chatLogs
     data.user = user
     res.status(200).send(data)
     console.log(req.user)
    } catch (error) {
        console.log(error)
        res.status(400).send('Error 400 Bad Request')
    }
 });

module.exports = router