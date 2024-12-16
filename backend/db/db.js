const mongoose = require('mongoose');
function connectDB(){
    mongoose.connect(process.env.DB_CONNECT 
    ).then(()=>{
        console.log('connect to DATABASE 🟢');
    }).catch(err =>console.log(err));

}
module.exports = connectDB;