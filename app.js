const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const chalk = require('chalk');

// Load env variables
dotenv.load({ path: '.env.local'});

const homeController = require('./controllers/home');

// Create Express Server
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', (err) => {
    console.log(err);
    console.log('MongoDB connection error. Check if mongodb is running.', chalk.red('✗'));
    process.exit();
})

// Express configuration
app.set('host', '0.0.0.0');
app.set('port', process.env.PORT || 3002);
// app.set('views', path.join(__dirname,'views'));

app.get('/home', homeController.index); 

app.listen(app.get('port'), () => {
    console.log('%s App is running at port %d', chalk.green('✓'), app.get('port'));
});

module.exports = app;

