const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    first_name:{
        type :String,
        required : true
    },
    last_name:{
        type :String,
        required : true,
    },
    email:{
        type :String,
        required : true,
        unique: true
    },
    student_code:{
        type :String,
        required : true,
        unique: true
    },
    department:{
        type :String,
        required : true
    },
    phone_number:{
        type :Number,
        required : true,
        unique: true
    },
    password:{
        type :String,
        required : true
    },
    confirm_password:{
        type :String,
        required : true
    },
    otp:{
        required : false,
        type : Number
    }
},{timestamps:true})

const  UserModel = mongoose.model("Users",UserSchema)
module.exports = UserModel;