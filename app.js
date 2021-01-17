//importing modules
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
var app = express();
const databaseConfig = require('./config/mongo');

//adding middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))

// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }))
app.use(cors());

//create db connection
mongoose.connect(databaseConfig.url, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

var todoModel = require('./models/todo.model');

//route definition
const todoRoute = require('./routes/todo.route');

//port number
const port = 3000;

//on connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database');
});
//on error in connection
mongoose.connection.on('error', (err) => {
    if (err) {
        console.log('Error while connection to database:' + err);
    }
});

//static files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/todo', todoRoute);

app.listen(port, () => {
    console.log('Server is started at port:' + port);
})