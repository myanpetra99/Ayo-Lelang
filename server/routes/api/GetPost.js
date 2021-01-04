const express = require('express')
const router = express.Router()
const Posts = require('../../models/PostSchema')

router.get('/post', async (req,res)=>{
   try {
    const allPost = await Posts.find()
    res.status(200).send(allPost)
   } catch (error) {
       console.log(error)
       res.status(400).send('Error 400 Bad Request')
   }
});

router.get('/post/:id', async (req,res)=>{
    try {
     const aPost = await Posts.findOne({_id: req.params.id})
     res.status(200).send(aPost)
    } catch (error) {
        console.log(error)
        res.status(400).send('Error 400 Bad Request')
    }
 });

module.exports = router