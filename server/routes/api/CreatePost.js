const express = require('express')
const router = express.Router()
const Posts = require('../../models/PostSchema')
const Chatlogs = require('../../models/ChatlogSchema')
const path = require('path')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: `public/uploads`,
    filename: (req, file, cb)=>{
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const uploads = multer({
    storage: storage
})


router.post('/post',uploads.single('image'),(req,res)=>{
            let imagePath = null
            let exception = false
            if(req.file)
            {
                imagePath = req.file.path
            }
            let newPost = new Posts({
                image: imagePath,
                title: req.body.title,
                description: req.body.description,
                startPrice: req.body.startPrice,
                nextBid: req.body.nextBid,
                startTime: req.body.startTime,
                endTime: req.body.endTime
           })

           try {
               newPost.save()
           } catch (error) {
               exception = true
               res.send('Error saving!', error)
                fs.unlinkSync(imagePath)
           }
           if(!exception){
               let newChatlogs = new Chatlogs({
                   postId: newPost._id
               })
               
               try {
                   newChatlogs.save()
               } catch (error) {
                res.send('Error saving!', error)
               }
           }
        }
    )


module.exports = router