const express = require('express')
const router = express.Router()
const passport = require('passport')

router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
  
      if (!user) {
        return res.status(400).send([user, "Cannot log in", info]);
      }
  
      req.login(user, err => {
        res.send('LOgged in!');
      });
    })(req, res, next);
  });

router.get('/logout',(req,res)=>{
    req.logout()
    return res.send();
})

module.exports = router