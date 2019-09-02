const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()        

app.set('port', (process.env.PORT || 1234 ))
app.use(bodyParser.json())



app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'ga75HpoblY9qBtOKo2m8QXauNvBoKQzt') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error : wrong token');
});


app.post('/webhook', function (req, res) {
    var data = req.body;
    
    // Make sure this is a page subscription
    if (data.object === 'page') {
        console.log('OK');
    
        data.entry.forEach(function(entry) {
        var pageID = entry.id;
        var timeOfEvent = entry.time;
    
        entry.messaging.forEach(function(event) {
            if (event.message) {
    
            //receivedMessage(event);
    
            } else {
    
            if(event.postback)
            {
                //receivedPostback(event);
            }      
    
            }
        });
        });
    
        // You should return a 200 status code to Facebook 
        res.sendStatus(200);
    }
    else
    {
        console.log('Error');
    }
    });