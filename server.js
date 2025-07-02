const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const app = express();
app.use(express.json()); // parse JSON bodies
app.use(session({
secret: 'your-secret-key', // use a strong secret or env var
resave: false,
saveUninitialized: false
})); // configure session middleware
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', {
useNewUrlParser: true,
useUnifiedTopology: true
});