const express = require('express')
const router = express.Router()
const Users = require('../../models/UserSchema')
const bcrypt = require('bcrypt')

router.post('/register',async (req,res)=>{

    let hashedPassword = ''

   hashedPassword = await bcrypt.hash(req.body.password,10)

    let newUser = new Users({
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
        password: hashedPassword,
   })

   try {
       newUser.save()
       res.sendStatus(200)
   } catch (error) {
       console.log(error)
       res.sendStatus(400)
   }

}
)


module.exports = router