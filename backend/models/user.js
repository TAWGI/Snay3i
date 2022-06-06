const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : String,
    email : String,
    password : String,
    tel  : String,
    role  : String,
    speciality  : String ,              
    experience  : String  ,             
    status  : String ,
    zone  : String ,
    declanations  : String ,
    availability  : String ,
    img  : String ,
    siteFeed: String ,
    likes: Number ,
    dislikes: Number 
})
const user = mongoose.model('User',userSchema);
module.exports = user ; 