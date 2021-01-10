const express = require('express')
const router = express.Router()
const Users = require('../../models/UserSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const verifyToken = require('../../middleware/verifyToken')

router.post("/login", async (req, res) => {
   const user = await Users.findOne({email : req.body.email})
   if(!user){
     res.sendStatus(404)
   }
   else{
    await bcrypt.compare(req.body.password, user.password, function(err, result) {
     if(err){
       console.log(err)
       res.sendStatus(400)
      }
        if(result){ 
          const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
            res.cookie('token', token, { httpOnly: true})
            res.status(200).send(token)
            console.log('Login Successful')
          }
          else{
            res.sendStatus(404)
            console.log('wrong password')
          }
      });
    }
  });

router.get('/logout',verifyToken, (req,res)=>{
     res.clearCookie('token')
     res.send('You just logged out')
})

module.exports = router