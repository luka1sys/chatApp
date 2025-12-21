const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const authRouter = require('./routes/auth.routes');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const messageRouter = require('./routes/message.routes');
const Message = require('./models/message.model');
const chatRouter = require('./routes/chat.router');
const cookieParser = require('cookie-parser');




dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

// IMPORTANT: Attach Socket.IO instance to requests so controllers can emit events
// This must run before the routers so controllers can access req.io
let io;
app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use('/api/auth', authRouter);
app.use('/api/messages', messageRouter);
app.use('/api/chats', chatRouter);

app.use((err, req, res, next) => {
    // 
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';


    // ვაბრუნებთ JSON პასუხს შეცდომის სტატუსით და მესიჯით
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
});

const server = http.createServer(app);

io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        credentials: true
    }
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // When user joins a chat room, add them to that room
    // This enables targeted message broadcasting to specific chats
    socket.on('joinChat', (chatId) => {
        console.log('joinChat', chatId);
        socket.join(chatId);
        console.log(`Socket ${socket.id} joined chat ${chatId}`);
    });

    // When user leaves a chat room
    socket.on('leaveChat', (chatId) => {
        socket.leave(chatId);
        console.log(`Socket ${socket.id} left chat ${chatId}`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('connected to database');

        const PORT = process.env.PORT || 3000;
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log('database connection error:', err);
        process.exit(1);
    });

