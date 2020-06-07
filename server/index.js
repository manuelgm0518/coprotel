const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const busboy = require('connect-busboy');
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);
mongoose.connect('mongodb+srv://adminxd:adminxd@coprotel-skxxg.mongodb.net/coprotel?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  console.log('Database connected');
})

//Middlewares
function logger(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  console.log(`Request recieved ${req.protocol}:/${req.get('host')}${req.originalUrl}`);
  const date = new Date;
  console.log(date.toUTCString());
  next();
}

app.use(express.json());
app.use(logger);
app.use(morgan('tiny'));
app.use(busboy());

//Routes
app.use('/api/user', require('./routes/user'));
app.use('/api/state', require('./routes/state'));
app.use('/api/municipality', require('./routes/municipality'));
app.use('/api/office', require('./routes/office'));
app.use('/file', require('./routes/file'));


app.listen(app.get('port'), function () {
  console.log('Server on port ' + app.get('port'));
});