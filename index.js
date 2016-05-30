var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send("Hello World!");
});

app.listen(process.env.Port || 3000, function() {
  console.log("Example app listening on port 3000!");
});

// app.set('port', (process.env.PORT || 3000));
// 
// app.get('/', function(request, response) {
//     response.send("Hello World!");
// }).listen(app.get('port'), function() {
//   console.log('App is running, server is listening on port ', app.get('port'));
// });
