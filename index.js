express = require('express'),
bodyParser = require('body-parser'),

app = express().use(bodyParser.json()); // creates express http server

// Sets server port and logs message on success
app.listen(process.env.PORT || 1234, () => console.log('webhook is listening'));


// Creates the endpoint for our webhook



app.post('/webhook', (req, res) => {  
 
  var botID = '293281931540823';
  
 // ProcessMessage("s","J TC");

  let body = req.body;

 // CallAPI();
 //console.log(body);
 body.entry.forEach(function(entry) {

  //console.log(entry);
  //console.log(body.entry[0].changes);
  //console.log(entry.changes[0].value.from);
  

  var sender_psid = entry.changes[0].value.from.id;
  var message = entry.changes[0].value.message;
 var count = entry.changes[0].value.to.data.length;
 //console.log("จำนวนคนส่ง "+count);

  entry.changes[0].value.to.data.forEach(function(recipient){

   // var recipient_psid = sender.id;
 
    if(botID == recipient.id)
  {
     
    console.log(body);
    console.log("******");
    console.log(entry);
    console.log("******");
    console.log(req);
   // console.log(entry.changes[0].value);

    console.log("End");

if(count > 1 )//& recipient.name.)
{
  var splitNameBot = message.split('@OFM - ITOps Bot');
  if(splitNameBot.length>1) ProcessMessage(sender_psid, splitNameBot[1]); 
  var splitNameBot = message.split('@OFM - ITOps Bot ');
  if(splitNameBot.length>1) ProcessMessage(sender_psid, splitNameBot[1]); 
}
else  ProcessMessage(sender_psid, message);   


  //  console.log(sender_psid);
    //sender_psid = '100036992748686';
    //console.log('OK');
    res.status(200).send('EVENT_RECEIVED');
  }
  else  res.sendStatus(404);
  
  

  });



});


   /* Backup กรณีที่เป็น Page
  if (body.object === 'page') {

    
  

    body.entry.forEach(function(entry) {

      let webhook_event = entry.messaging[0];
       //  console.log(entry);
      let sender_psid =  '100036992748686';//webhook_event.sender.id;
      if (webhook_event.message) {
      // console.log(webhook_event);
     //   handleMessage(sender_psid, webhook_event.message);        
      }
      else
      {
   
      }

     // console.log(webhook_event['message']['text']);
    // console.log(webhook_event['sender']['id']);
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
*/
});





function ProcessMessage(sender_psid,message)
{

  //try{

   


    var command = message.split('-');
    var empty = "ไม่มีคำสั่งดังกล่าว";

    if(command.length >1)
    {
      var request_body = JSON.stringify({
      
        "message": command[1]
        
      });


      if(command[0].toUpperCase() === 'S' || command[0] === 'ยอดขาย' || command[0].toUpperCase() === 'SALES' || command[0].toUpperCase() === 'SALE')
      {
        var options = {
          host: '10.17.1.32',
          port: 9862,
          path: '/api/v1/Sales/GetSales', 
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Lenght": Buffer.byteLength(request_body)
          }
        }
    
        var http = require('http');
     
        
        var req = http.request(options, function(res) {
          res.setEncoding('utf8');
    
          res.on('data', function (chunk) {
            SendMessage(sender_psid,chunk);

           
           
          });
        });
        req.write(request_body);
        req.end();
      }
    }
    else
    {
      SendMessage(sender_psid,empty);
    }

  //  if(Value === "")
  //  {
  //    console.log(Value);
 //     Value = "ไม่มีคำสั่งดังกล่าว";
 //   }

   
    

  /*

    var options = {
        host: '10.17.1.32',
        port: 9862,
        path: '/api/v1/Sales/GetSales?Message='+message, 
        method: "GET",
        headers: {
          "Content-Type": "application/javascript"
        }
      }

      var http = require('http');
   
      
      var req = http.request(options, function(res) {
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
          console.log(chunk);
         // SendMessage(sender_psid,chunk);
         
        });
      });
      req.end();
 
     */

    
 // }catch( express)
 // {
 //   console.log('Error :'+express);
 // }


}

function SendMessage(sender_psid, Message) {
  // Construct the message body
   
  var request_body = JSON.stringify({
    "messaging_type":"RESPONSE",
    "recipient": {
      "id": sender_psid
    },
    "message":{
      "text": Message
    } 
  });
  //console.log(request_body);

  

var options = {
  host: "graph.facebook.com",
  path: "/v4.0/me/messages?access_token=DQVJzemlHdVlSRGFjcDhCWVFpcWo2VzE3R3R2M3M3VWQzX1drLWJpcTVqZA19IWVpCaFBYSEVKbW5yeHFMdVMzSnp1QjFobWktcDJYX1M1a3RIeHplWktweEhBczdCaGVkLTVFQ2RFdnp1MzhRMFNLUjRXY29tZA1N1TjNoS3lWT0VCZAU9xVmhVekxPZAmJQUDNMdkdwUFNoeHlKRW1xT2xFVVBrZATRxWTZAtOVNxd0ZAIZAGxFZAS12ekR3SkFLM3VlaDlhRk52cjVn", 
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Lenght": Buffer.byteLength(request_body)
  }
}

var https = require('https');


var req = https.request(options, function(res) {
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
   // console.log('Complete');
  });
})
req.write(request_body);
req.end();
  
/*
  request({
    "uri": "https://graph.facebook.com/v4.0/me/messages",
    "qs": { "access_token": "DQVJzemlHdVlSRGFjcDhCWVFpcWo2VzE3R3R2M3M3VWQzX1drLWJpcTVqZA19IWVpCaFBYSEVKbW5yeHFMdVMzSnp1QjFobWktcDJYX1M1a3RIeHplWktweEhBczdCaGVkLTVFQ2RFdnp1MzhRMFNLUjRXY29tZA1N1TjNoS3lWT0VCZAU9xVmhVekxPZAmJQUDNMdkdwUFNoeHlKRW1xT2xFVVBrZATRxWTZAtOVNxd0ZAIZAGxFZAS12ekR3SkFLM3VlaDlhRk52cjVn" },
   "method": "POST",
    "json": request_body
  }, function (err, res, body) {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  });   */
}



app.get('/webhook', (req, res) => {
 
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
      //console.log(PAGE_ACCESS_TOKEN);
      //console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);      
    }
  }
});





