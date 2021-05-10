const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// body parser middleware

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');

const db = require('./config/keys').mongoURI;

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("Mongodb connected")).catch(err => console.log(err));

app.get('/', (req,res) => {
    res.send('Hello');
});

//use routes

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
 


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`))