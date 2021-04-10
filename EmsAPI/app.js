const http = require('http');
const connectDB = require('./config/db');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('./config/passport');
const passport = require('passport');
const cors = require('cors');
const api = require('./routes/api');
const socketio = require('socket.io');


//Connecting to MongoDB
connectDB()
const app = express();

const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    }
});


//Port number
const port = 27017;

app.use(express.json());

// bodyParser middleware
app.use(bodyParser.json());

// cors middleware
app.use(cors());

app.use(passport.initialize());

// all api routes
app.use('/api', api);

//Test Websocket route
app.post('/socket_notification', (req, res) => {
    io.emit('notification', { msg: "text info" });
    res.end(JSON.stringify({ success: true, msg: "msg sent" }));
});

//Set static folder for angular frontend dist
app.use(express.static(path.join(__dirname, 'public')));

//TestHtml
app.get('/testpage', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/test.html'));
})

//AngularJS Frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

//Socket Programming
io.on('connection', socket => {
    //socket.broadcast.emit('hi');
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});


// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});


// start server
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});