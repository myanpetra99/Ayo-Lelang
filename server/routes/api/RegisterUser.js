const express = require('express')
const router = express.Router()
const Users = require('../../models/UserSchema')
const bcrypt = require('bcrypt')

router.post('/',async (req,res)=>{

    const hashedPassword = null

    await bcrypt.hash(req.body.password,10,function(error,res){
        if(error){
            console.log(error)
        }
        hashedPassword = res
    })

    let newUser = new Users({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword,
   })

   try {
       newUser.save()
   } catch (error) {
       console.log(error)
       res.sendStatus(400)
   }

}
)


module.exports = router