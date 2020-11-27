// https://www.youtube.com/watch?v=vjf774RKrLc

// Import express
const express = require("express");
// For the database, npm install mongoose
// https://mongoosejs.com/
// Get free database on mlab.com
// When pushing this code to e.g. github, we cannot store the url and user credentials since this is public
// Therefore, use 'npm install dotenv'
const mongoose = require("mongoose");
// Import created '.env' file in which uri for DB is configured
require('dotenv/config');
// bodyParser returns json format of a json object
const bodyParser = require('body-parser');
// Import CORS to allow acces from different domains (first install cors)
const cors = require('cors');

const app = express();

// Middlewares = function when routes are being hit (e.g. can be used for authentication)
/* app.use('/posts', () => {
    console.log('This is a middleware running on the posts screen');
}) */

// Import Routes
const postsRoute = require('./routes/posts');

//Middlewares
app.use(cors());
// Use middleware to parse the body on every request, this will display an incoming datastream as a json object
app.use(bodyParser.json());
// Use middleware to call the postsRoute file
app.use('/posts', postsRoute);


// Routes
app.get('/', (req,res) => {
    res.send('We are on the homescreen');
});

// Connect to DB (in mlab/cloud.mongodb 'connect' > 'your application' > copy uri and adjust):
// BUT TO hide this, create new file '.env' and access credentials via process.env.DB_CONNECTION
mongoose.connect(
    process.env.DB_CONNECTION,
    //'mongodb+srv://<username>:<password>@cluster0.ktgrr.mongodb.net/<dbname>?retryWrites=true&w=majority', 
    { useUnifiedTopology: true, useNewUrlParser: true }, 
    () => console.log('Connected to db'));


// Boot up server
const port = 3000 || process.env.port;

app.listen(3000, () => console.log(`Server running on localhost:${port}`));