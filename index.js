express = require('express'),
bodyParser = require('body-parser'),
app = express().use(bodyParser.json()); // creates express http server

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));


// Creates the endpoint for our webhook



app.post('/webhook', (req, res) => {  
 
  let body = req.body;

  if (body.object === 'page') {


    body.entry.forEach(function(entry) {

      let webhook_event = entry.messaging[0];
         console.log(entry);
      let sender_psid = webhook_event.sender.id;
      if (webhook_event.message) {
       console.log(webhook_event);
        handleMessage(sender_psid, webhook_event.message);        
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

});

function handleMessage(sender_psid, received_message) {

  let response;

  // Checks if the message contains text
  
  if (received_message.text) {
  
    // Creates the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    response = {
      "text": `Bot ตอบ "${received_message.text}"`
    }

  } else if (received_message.attachments) {
    console.log('att');
    // Gets the URL of the message attachment
    let attachment_url = received_message.attachments[0].payload.url;
  
  } 

  // Sends the response message
  callSendAPI(sender_psid, response);    
}

function callSendAPI(sender_psid, response) {
  // Construct the message body
 
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }

  console.log(request_body);

  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages?access_token=DQVJzemlHdVlSRGFjcDhCWVFpcWo2VzE3R3R2M3M3VWQzX1drLWJpcTVqZA19IWVpCaFBYSEVKbW5yeHFMdVMzSnp1QjFobWktcDJYX1M1a3RIeHplWktweEhBczdCaGVkLTVFQ2RFdnp1MzhRMFNLUjRXY29tZA1N1TjNoS3lWT0VCZAU9xVmhVekxPZAmJQUDNMdkdwUFNoeHlKRW1xT2xFVVBrZATRxWTZAtOVNxd0ZAIZAGxFZAS12ekR3SkFLM3VlaDlhRk52cjVn",
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  }); 
}

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
      const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
      //console.log(PAGE_ACCESS_TOKEN);
      //console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);      
    }
  }
});






app.listen(process.env.PORT || 1234)
//app.listen(1234);
//https.createServer(app).listen(1234);