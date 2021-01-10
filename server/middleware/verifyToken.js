const jwt = require('jsonwebtoken')
module.exports = function(req,res,next){
 const token = req.cookies.token
 console.log(req.cookies.token)

 if(!token) 
    {
     res.sendStatus(401)
     console.log('No Token!')
    }

 try {
     const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = verified
    return next()
 } catch (error) {
     console.log(error)
     res.status(400).send('Invalid Token')
 }
}