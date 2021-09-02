const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const commentRouter = require('./routes/comment');
const passport = require('passport');
const morgan = require('morgan');

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
app.listen(PORT, console.log(`Server started on port ${PORT}`));
