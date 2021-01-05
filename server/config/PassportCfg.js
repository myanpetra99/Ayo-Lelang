const Users = require('../models/UserSchema')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

module.exports = function(passport){
    passport.use(new LocalStrategy({
        usernameField: 'email'
        },
        function(email, password, done)
        {
            Users.find({email : email}, async function(err, user){
                if(err) { console.log(err) }
                if(!user){ return done(null, false, {message: 'Incorrect Email'}) }
                try {
                    if(await bcrypt.compare(password, user.password)){
                        return done(null,user)
                    } else {
                        return done (null, false, {message : 'Incorrect Password'} )
                    }
                } catch (error) {
                    console.log(error)
                }
            })
         }
    ))
    
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
    passport.deserializeUser(function(id, done) {
        Users.findById(id, function(err, user) {
          done(err, user);
        });
      });
}