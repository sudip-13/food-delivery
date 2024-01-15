const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserRouter = require('./routers/user')
const AdminRouter = require('./routers/admin')

const app = express()
app.use(express.json())
app.use(cors())

const PORT = 3001;

mongoose.connect("mongodb+srv://Team-Louda:bsdk%40007@project-1.jd5yyyy.mongodb.net/")
  .then(console.log('DB connected'))
  .catch((error)=>console.log('DB connection failed',error))

app.use('/',UserRouter);
app.use('/admin/',AdminRouter);

app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})