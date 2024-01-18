const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const AdminRouter = require('./routers/admin')
const StaticRouter = require('./routers/ststic')
const UserRouter = require('./routers/user')
const {restrictToLoggedinUserOnly} = require('./middlewares/auth')


const PORT = 3001;

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(cors())
app.use("/files",express.static("files"))
app.use(cookieParser());



mongoose.connect("mongodb+srv://Team-Louda:bsdk%40007@project-1.jd5yyyy.mongodb.net/")
.then(console.log('DB connected'))
.catch((error)=>console.log('DB connection failed',error))

app.use('/',StaticRouter);
app.use('/user/',restrictToLoggedinUserOnly,UserRouter);
app.use('/admin/',AdminRouter);

app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})