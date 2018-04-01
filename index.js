'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: "v05A3MBRmEb9r+oyyBc4c9tff6quwHFKqe1+a71JweV8Ajc2bfzHn/PM04P66wj3w8Y0DIo33s1zgHN5UXrPc57ZHVF75q5RpU/h1yW7Yyp214+xAv3Acgl3lzyDQ66j3A+koTU3vFS8HP4AFe/lbgdB04t89/1O/w1cDnyilFU=",
  channelSecret: "2d20ffa36c0d5f8326e1da86db7ac49d",
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = 80;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
