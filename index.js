var express = require('express')
var bodyParser = require('body-parser');
var sendMessage = require('sendmessage');

//var http = require('http');
//var https = require('https');


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");//res.header('Access-Control-Allow-Origin', 'http://localhost:8888'); //or restrict domainะ
    res.header("Access-Control-Allow-Headers", "cache-control, content-type, departmentuid, hasanonymouspermission, if-modified-since, incus-token, patientorderuid, useruid, patientorderitemuid");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    next();
});


// Creates the endpoint for our webhook



app.post('/webhook', (req, res) => {
  console.log(Date.now);
  console.log('Start');
try {

  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === 'page') {
 
 
 

    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {

      // Gets the message. entry.messaging is an array, but
      // will only ever contain one message, so we get index 0
    //  let webhook_event = entry.messaging[0];
     //console.log(webhook_event);
    
     //res.send('ส่งข้อความกลับ'); 
     console.log(body.object);
     console.log('********'); 
     let webhook_event = entry.messaging[0];
     console.log(webhook_event[0]);
    // console.log(webhook_event[0]['sender']['id']);
        console.log(webhook_event[0]['message']);
  
  //   console.log(webhook_event[0]['thread']); 
    
    

    
     
    });

    // Returns a '200 OK' response to all requests
   // res.status(200).send('EVENT_RECEIVED');
   res.status(200).send('EVENT_RECEIVED');
  } else {
    console.log(body.object);
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404).send('Error');
  }

}
catch(express)
{
 
}


 

});

// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {
  console.log('1');
  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = "ga75HpoblY9qBtOKo2m8QXauNvBoKQzt"

  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {

    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {

      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);

    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
  else   res.status(200).json({ message: token});
});


app.get('/test', function (req, res) {
  res.status(200).json({ message: "5555" });
});


app.listen(process.env.PORT || 1234)
//app.listen(1234);
//https.createServer(app).listen(1234);