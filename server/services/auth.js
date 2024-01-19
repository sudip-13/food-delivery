const jwt = require('jsonwebtoken')
const dotenv =require('dotenv');
dotenv.config({ path: '../config.env' });


const secret = process.env.JWT_SECRET


function setUser(user){
    return jwt.sign({
        _id : user._id,
        email : user.email
    },secret);
}

function getUser(token){
    if(!token) return null;
    try{
        return jwt.verify(token,secret)
    }
    catch(error){
        console.log(error);
        return null;
    }
}

module.exports = {
    setUser,getUser
};