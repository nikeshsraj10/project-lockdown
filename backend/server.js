const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); //Helps connect to our mongoDB 

require('dotenv').config();

//Create our express server
const app = express();
const port = process.env.PORT || 5000;

//CORS Middleware
app.use(cors());
app.use(express.json()); //Normally we need body-parser here but its not needed in latest express version

//Connecting to the database on mongoDB Atlas
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});
//useNewUrlParser - rewrote the tool that parses mongodb connection string
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

const usersRouter = require('./routes/users');
app.use('/users', usersRouter); 

//Starts the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});