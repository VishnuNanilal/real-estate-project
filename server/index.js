const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const mongoose = require('./configs/databaseConfig');

const userRouter = require('./routers/user.router');
const sellerRouter = require('./routers/seller.router');
const propertyRouter = require('./routers/property.router');
const path = require('path');

app.use(cors());
app.use(express.json());

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "..", "client", "build")));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
    });
} else {
    // Base route for development
    app.get('/', (req, res) => {
        console.log("201 OK!");
        res.status(200).send('Welcome to the API!');
    });
}

// Use specific routers
app.use('/user', userRouter);
app.use('/seller', sellerRouter);
app.use('/property', propertyRouter);

// Fallback route for handling 404 errors
app.use('*', (req, res) => {
    res.status(404).send('Route not found');
});

//deployed site will set process.ENV.PORT
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server listening at port ${PORT}`));
