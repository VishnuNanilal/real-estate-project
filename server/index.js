const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('./configs/databaseConfig')

const userRouter = require('./routers/user.router');
const sellerRouter = require('./routers/seller.router');

app.use(cors())
app.use(express.json())
app.get('/', (req, res)=>console.log("201 OK!"))

app.use('/user', userRouter);
app.use('/seller', sellerRouter)

app.listen(process.env.PORT, ()=>console.log(`Server listening at port ${process.env.PORT}`))