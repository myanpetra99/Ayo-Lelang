const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT
const http = require('http').Server(app)
var io = require('socket.io')(http, { 'cors': { 'methods': ['GET', 'PATCH', 'POST', 'PUT'], 'origin': true } });
const createPost = require('./routes/api/CreatePost')
const getPost = require('./routes/api/GetPost')
const deletePost = require('./routes/api/DeletePost')
const updatePost = require('./routes/api/UpdatePost')
const RegisterUser = require('./routes/api/RegisterUser')
const LoginUser = require('./routes/api/LoginUser')
const UserProfile = require('./routes/api/UserProfile')
const cookieparser = require('cookie-parser')
const bodyparser = require('body-parser')
const mongoose = require('mongoose') 
const cors = require('cors')
const expresssession = require('express-session')

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify:false
})
const Chatlog = require('./models/ChatlogSchema')
app.use(cors({credentials: true, origin: 'http://localhost:8080'}))
app.use(cookieparser())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: true
  }));
app.use(expresssession(({ secret: 'Beatles', resave: true, saveUninitialized: true,  })))
app.use('/public', express.static(`${__dirname}/public/`));



app.use('/api',createPost)
app.use('/api',getPost)
app.use('/api',deletePost)
app.use('/api',updatePost)
app.use(RegisterUser)
app.use(LoginUser)
app.use(UserProfile)


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