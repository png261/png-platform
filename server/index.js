const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const commentRouter = require('./routes/comment');
const passport = require('passport');
const morgan = require('morgan');
const initSocket = require('./socket/init');

// Load config
dotenv.config({ path: './config/config.env' });
require('./config/passport')(passport);

//connect mongoDB
connectDB();

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/posts', commentRouter);

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
