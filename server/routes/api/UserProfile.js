const express = require('express')
const router = express.Router()
const Users = require('../../models/UserSchema')
const verifyToken = require('../../middleware/verifyToken');
const path = require('path')
const multer = require('multer')
const fs = require('fs')
const storage = multer.diskStorage({
    destination: `public/uploads/user`,
    filename: (req, file, cb)=>{
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const uploads = multer({
    storage: storage
})

router.get('/user', verifyToken ,async (req,res)=>{
   try {
    const user = await Users.findOne({_id: req.user._id})
    res.status(200).send(user)
   } catch (error) {
       console.log(error)
       res.sendStatus(400)
   }
});

router.post('/user/updatepicture',verifyToken,uploads.single('image'), async(req,res)=>{
    let imagePath = null
    const user = await Users.findOne({_id: req.user._id})
    const path = user.image
    if (path !== null ){
        fs.unlinkSync(path)
    }
    if(req.file)
    {
        try {
            imagePath = req.file.path
        await Users.findOneAndUpdate({ _id: req.user._id }, {
            image : imagePath
        })
        } catch (error) {
            res.sendStatus(400)
            console.log('ERROR SAAT UPDATE')
            fs.unlinkSync(imagePath)
        }
    }else{
        res.sendStatus(500)
        console.log('ERROR INTERNAL SERVER ERROR GAN')
    }
    


})




module.exports = router