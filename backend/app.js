const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors')
const express = require('express');
const app = express(); 
const connectDB= require('./db/db');
const userRoutes= require('./routes/user.routes');


//db invokled
connectDB();
app.use(cors());
app.use(express.json());

//text to js object convertion
app.use(express.urlencoded({extended:true}));


app.get('/', (req, res)=>{
    res.send("jay siyaram")
});

app.use('/users', userRoutes);


module.exports = app;