const express = require('express')
const router = express.Router()
const Posts = require('../../models/PostSchema')
const Chatlogs = require('../../models/ChatlogSchema')


router.put('/post/:id', async (req,res)=>{
        try {
            await Posts.findOneAndUpdate({_id: req.params.id},
                {user: req.body.user , currentPrice: req.body.currentPrice})
            await Chatlogs.userlog.push({
                
            })
        } catch (error) {
            console.log(error)
            res.sendStatus(500)
        }
    })


module.exports = router 