const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect To Database
mongoose.Promise = require('bluebird');
mongoose.connect(config.database, {promiseLibrary: require('bluebird') })
    .then(() => console.log(`Connected to database ${config.database}`))
    .catch((err) => console.log(`Database error: ${err}`));

const app = express();

const users = require('./routes/users');
const venues = require('./routes/venues');
const shifts = require('./routes/shifts');
const mailer = require('./routes/mailer');

// Port Number
const port = 3000; //(local)
// const port = process.env.port || 8080; //(Heroku)

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/venues', venues);
app.use('/shifts', shifts);

//View Engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

// Start Server
app.listen(port, () => {
    console.log('Server started on port: '+port);
});