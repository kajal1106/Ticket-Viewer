var express = require('express');
var http = require('http');
var path = require('path');
require('dotenv').config()


var tickets = require('./routes/tickets').tickets;
var singleTicket = require('./routes/singleTicket').singleTicket;

var app = express();
  
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/ticket/:ticketId', singleTicket);
app.use('/:pageNo', tickets);
app.use('/', tickets);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;


  