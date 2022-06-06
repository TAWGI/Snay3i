const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    idClient : String,
    idTech : String,
    date : String,
    status : String,
    description : String,
    adress : String,
    service : String,
    cathegory : String,
    price : String,
    zone : String,
    img : String,
    rating : String,
    feedBack : String
    
})
const order = mongoose.model('order',orderSchema);
module.exports = order ; 