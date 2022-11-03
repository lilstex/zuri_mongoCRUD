const express = require('express');
const routes = require('./routes/index.js');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();

const PORT = process.env.PORT;
const DB = process.env.DATABASE;

// CONNECTING TO THE DATABASE
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connected successfully');
}).catch(err => {
    console.log(err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('', routes);


app.listen(PORT, () => {
    console.log(`Todo Crud Application Listening on Port: ${PORT}`)
})

module.exports = app;