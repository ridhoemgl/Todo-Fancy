const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()

const index = require('./routes/index')

const app = express()
app.use(express.urlencoded({ extended:false }))
app.use(express.json())

app.use(cors())

mongoose.connect('mongodb://localhost/to-do-fancy-db', { useNewUrlParser: true });

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('database connected...');
});

app.use('/', index)

app.listen(3000, () => {
    console.log('running on port 3000');
})
