// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/:param", function(request, response){
  var param = request.params.param;
  response.json(getResult(param));
});

function getResult(param){
  var time = parseInt(param);
  console.log("time: " + time);
  var result = {
		unix: null,
		natural: null
	};
  
  if (isValidTime(time)) {
    var date = new Date(time);
    console.log("Date: " + date);
    console.log("Natural Date: " + getNaturalDate(date));
    result.unix = param;
    result.natural = getNaturalDate(date);
  } else {
    var date = new Date(param);
    console.log("Date: " + date);
    result.unix = date.getTime();
    if(isNaN(result.unix)) {
      console.log("Error: Incorrect format for date: " + param);
    } else {
      result.natural = param;  
    }
  }
  
	return result;
}

function isValidTime(time){
  return !isNaN(time);
}

function getNaturalDate(date) {
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('FCC Timestamp is listening on port ' + listener.address().port);
});
