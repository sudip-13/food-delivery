const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    fullName:{
        type :String,
        required : true,
    },
    email:{
        type :String,
        required : true,
        unique: true
    },
    phoneNumber:{
        type :Number,
        required : true,
        unique: true
    },
    aadharNumber:{
        type :Number,
        required : true,
        unique: true
    },
    aadharCard:{
        type:String,
        required : true,
    },
    otp:{
        required : false,
        type : Number
    }
},{timestamps:true})
const  AdminModel = mongoose.model("Admins",adminSchema)
module.exports = AdminModel;