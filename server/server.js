const express = require('express')
const app = express()
const PORT = process.env.PORT || 8081
const http = require('http').Server(app)
var io = require('socket.io')(http, { 'cors': { 'methods': ['GET', 'PATCH', 'POST', 'PUT'], 'origin': true } });
const createPost = require('./routes/api/CreatePost')
const getPost = require('./routes/api/GetPost')
const deletePost = require('./routes/api/DeletePost')
const updatePost = require('./routes/api/UpdatePost')
const RegisterUser = require('./routes/api/RegisterUser')
const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('passport')
const expresssession = require('express-session')


mongoose.connect('mongodb+srv://mypdota99:ln1OHrcD0Maracjw@cluster0.eqrnl.mongodb.net/test',{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify:false
})

app.use('/public', express.static(`${__dirname}/public/`));
app.use(express.json())
app.use(cors())
app.use(expresssession(({ secret: 'Beatles', resave: true, saveUninitialized: true })))
app.use(passport.initialize())
app.use(passport.session());

app.use('/api',createPost)
app.use('/api',getPost)
app.use('/api',deletePost)
app.use('/api',updatePost)
app.use('/register',RegisterUser)

app.get('/',( req, res) => {
    res.status(200).send('OK')
})
    
io.on('connection', (socket) => {
   socket.on('join',(roomid)=>{
       socket.join(roomid)
       socket.on('user-bid', (data) => {
           console.log('A user has bid')
           console.log(data)
           io.in(roomid).emit('dataBid', data);
    })
   })

   

    socket.on('disconnect', () => {

    });
});

http.listen(PORT, () => {
    console.log('Server on port : 8081');
});