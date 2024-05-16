const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('./configs/databaseConfig')

const userRoute = require('./routers/user.router');

app.use(cors())
app.use(express.json())
app.get('/', (req, res)=>console.log("201 OK!"))

app.use('/user', userRoute);

app.listen(process.env.PORT, ()=>console.log(`Server listening at port ${process.env.PORT}`))