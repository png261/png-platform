const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const commentRouter = require('./routes/comment');
const morgan = require('morgan');
const initSocket = require('./socket/init');

//connect mongoDB
connectDB();

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/posts', postRouter);
app.use('/posts', commentRouter);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`Server started on port ${PORT}`));

// Socket.io
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    },
});

initSocket(io);

// app set to use socket in routes ( const io = req.app.get('socket.io') )
app.set('socket.io', io);
