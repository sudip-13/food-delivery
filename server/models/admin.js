const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    email:{
        type :String,
        required : true,
        unique: true
    },
    aadhar:{
        type :String,
        required : true,
        unique: true
    }
})
const  AdminModel = mongoose.model("Admin",adminSchema)
module.exports = AdminModel;