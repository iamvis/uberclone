const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors')
const express = require('express');
const app = express(); 
const cookieParser = require('cookie-parser');
const connectDB= require('./db/db');
const userRoutes= require('./routes/user.routes');
const captainRoutes= require('./routes/captain.routes');

//db invokled
connectDB();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//text to js object convertion
app.use(express.urlencoded({extended:true}));


app.get('/', (req, res)=>{
    res.send("jay siyaram")
});

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);


module.exports = app;