var request = require('request')

module.exports = {
    sendText: function sendText(replyToken, text) {
        let data = {
            replyToken: replyToken,
            messages: [{
                type: 'text',
                text: text
            }]
        }
        console.log("data", data);
        request({
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`
            },
            url: 'https://api.line.me/v2/bot/message/reply',
            method: 'POST',
            body: data,
            json: true
        }, function(err, res, body) {
            if (err) console.log('error')
            if (res) console.log('success')
            if (body) console.log(body)
        })
    }
}