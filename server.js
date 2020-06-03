// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/timestamp/:date_string?',(req,res)=>{
  var dater=req.params.date_string;
  if(!dater){
    let date=new Date()
    res.json({"unix": date.valueOf(), "utc": new Date().toUTCString()})
  }
  else if(isNaN(new Date(dater).getTime()) && isNaN(new Date(dater*1000).getTime())){
    res.json({"error":"Invalid Date"})
    //console.log(new Date(dater).getTime())
  }
  else{
    if(dater.includes('-')){
    res.json({"unix": new Date(req.params.date_string).valueOf(), "utc": new Date(req.params.date_string).toUTCString()})
  }
  else{
    res.json({"unix": dater, "utc": new Date(dater*1).toUTCString()})
  }
  }
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});