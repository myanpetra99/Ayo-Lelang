const express = require('express')
const router = express.Router()
const Posts = require('../../models/PostSchema')
const Chatlogs = require('../../models/ChatlogSchema')
const fs = require('fs')


router.delete('/post/:id/delete', async (req,res)=>{
        const aPost = await Posts.findOne({_id:req.params.id})
        const path = aPost.image
         try {
             fs.unlinkSync(path)
         } catch (error) {
             console.log(error)
         } finally {
            await Posts.findOneAndDelete({_id:req.params.id})
            await Chatlogs.findOneAndDelete({postId: req.params.id})
         }
        }
    )


module.exports = router 