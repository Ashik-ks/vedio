const mongoose = require('mongoose')

let user = new mongoose.Schema({
    name: {
        type :String,
        // required : true,
    },
    vedio: {
        type :String,
        // required : true,
    },
    
})

let User = mongoose.model('user',user)
module.exports = User;