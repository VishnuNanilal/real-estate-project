const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('./configs/databaseConfig')

const userRouter = require('./routers/user.router');
const sellerRouter = require('./routers/seller.router');
const propertyRouter = require('./routers/property.router');

app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
    console.log("201 OK!");
    res.status(200).send('Welcome to the API!');
});

app.use('/user', userRouter);
app.use('/seller', sellerRouter)
app.use('/property', propertyRouter)

app.listen(process.env.PORT, ()=>console.log(`Server listening at port ${process.env.PORT}`))