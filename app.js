const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config/database')

// set up express app
const app = express()

// connect to mongodb MLAB
mongoose.connect(config.database)
mongoose.Promise = global.Promise

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

// static files
app.use(express.static('./public'))

const port = process.env.PORT || 3000

app.use(bodyParser.json())

const routes = require('./routes/api')

// initialize routes
app.use('/api', routes)

// error handling middleware
app.use((err, req, res, next) => {
    //console.log(err)
    res.status(422).send({error: err.message})
})

// listen for requests
app.listen(port, () => {
    console.log('Server started on port ' + port)
})