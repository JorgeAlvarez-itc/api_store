const mongoose = require('mongoose');
const dotenv = require('dotenv').config(); 
mongoose.connect(process.env.CONNECTION_STRING).then(()=>{
    console.log("Connection successful");
}).catch((error)=>{
    console.log(error);
});

module.export = mongoose;