const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const createError = require("http-errors");
const morgan = require('morgan');
const cors = require('cors')
const authenticate = require('./middlewares/authenticate.middleware');
const authorize = require('./middlewares/authorize.middleware')
const port = process.env.PORT || 9090;
require('./database/db');
require('dotenv').config();
// app
const app = express();
app.use(cors())
// middlewares
app.use(morgan('combined'));
app.use(express.json({extended:false}));
app.use(express.urlencoded({ extended: false }));


// app.use(cookieParser());

const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog')


// app.use('/', (req, res) => res.send('hello'));
app.use('/api/user/', userRoute);
app.use('/api/blog', authenticate,  blogRoute)
app.use(function(req,res,next){
    next(createError(404))
})
app.use(function(err, req,res, next){
    res.status(err.status||500).json(err)
})
app.listen(port, () => {
    console.log(`Server Listening at ${port}`);
})