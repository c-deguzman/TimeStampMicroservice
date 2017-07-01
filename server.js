
var express = require('express');
var app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/index.html');
});


app.get("/:date", function (request, response) {
  
  var date_obj;
  
  if (!isNaN(parseInt(request.params.date))){
    date_obj = new Date(parseInt(request.params.date) * 1000);
  } else {
    date_obj = new Date(Date.parse(decodeURI(request.params.date)));
  }
  
  if (isNaN(date_obj.getTime())){
    response.send({unix: null, natural: null});
  } else {
    
    var options = {month: "long", day: "numeric", year: "numeric"};
    
    response.send({unix: date_obj.getTime() / 1000, natural: date_obj.toLocaleDateString("en-US", options)});
  }
  
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
