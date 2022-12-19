const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const usersSchema = mongoose.Schema ({
    name: {
        type : String,
        required:true,
    },
    email: {
        type : String,
        required:true,
    },
    password:  {
        type : String,
        required: true,
        
    },   
    date:{
        type:String,
        
    },
    role:{
       type:String,
       default:"User"
    }
    

},
    
{ timestamps: true })
 

module.exports = mongoose.model("users",usersSchema)