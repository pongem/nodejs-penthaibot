'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var MsTranslator = require('mstranslator');

var util = require('./util.js');
var client = new MsTranslator({
    api_key: process.env.BING_SECRET
}, true);

app.use(bodyParser.json())

app.set('port', (process.env.PORT || 4000))
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

app.post('/callback', (req, res) => {
    var text = req.body.events[0].message.text
    var sender = req.body.events[0].source.userId
    var replyToken = req.body.events[0].replyToken

    client.detect({
        text: text
    }, function(err, data) {
        if (data === "th") {
            util.sendText(replyToken, "ผมแปลไทยเป็นไทยไม่ได้นะฮะ");
        } else {

            var params = {
                text: text,
                to: 'th'
            };
            client.translate(params, function(err, data) {
                console.log("translate",data);
                util.sendText(replyToken, data);
            });
        }
    });

    if (text === 'สวัสดี' || text === 'Hello' || text === 'hello') {
        util.sendText(replyToken, "สวัสดี")
    }
    res.sendStatus(200)
})

// Creates the endpoint for our webhook 
app.post('/fbwebhook', (req, res) => {  
 
  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === 'page') {

    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {

      // Gets the message. entry.messaging is an array, but 
      // will only ever contain one message, so we get index 0
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});

// Adds support for GET requests to our webhook
app.get('/fbwebhook', (req, res) => {

  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = "abcdes12"
    
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
});


app.listen(app.get('port'), function() {
    console.log('run at port', app.get('port'))
})