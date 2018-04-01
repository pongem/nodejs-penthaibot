var express = require('express')
var bodyParser = require('body-parser')
var app = express()
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
            util.sendText(sender, "ผมแปลไทยเป็นไทยไม่ได้นะฮะ");
        } else {

            var params = {
                text: text,
                to: 'th'
            };
            client.translate(params, function(err, data) {
                console.log(data);
                util.sendText(sender, data);
            });
        }
    });

    if (text === 'สวัสดี' || text === 'Hello' || text === 'hello') {
        util.sendText(sender, text)
    }
    res.sendStatus(200)
})


app.listen(app.get('port'), function() {
    console.log('run at port', app.get('port'))
})