const express = require('express')
const router = express.Router()
const Posts = require('../../models/PostSchema')
const Chatlogs = require('../../models/ChatlogSchema')
const verifyToken = require('../../middleware/verifyToken')

router.put('/post/:id', verifyToken, async (req,res)=>{
    let datas = {}
    datas._id = req.user._id
    datas.bid = req.body.currentPrice
        try {
            await Posts.findOneAndUpdate({_id: req.params.id},
                {user: req.body.user , currentPrice: req.body.currentPrice})
            await Chatlogs.findOneAndUpdate({postId : req.params.id}, { $push : { userlog : datas}})
        } catch (error) {
            console.log(error)
            res.sendStatus(500)
        }
    })


module.exports = router 