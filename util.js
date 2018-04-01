var request = require('request')

module.exports = {
    sendText: function sendText(sender, text) {
        let data = {
            to: sender,
            messages: [{
                type: 'text',
                text: 'สวัสดี'
            }]
        }
        request({
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`
            },
            url: 'https://api.line.me/v2/bot/message/push',
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