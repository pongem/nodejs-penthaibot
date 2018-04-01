var MsTranslator = require('mstranslator');
// Second parameter to constructor (true) indicates that
// the token should be auto-generated.

var client = new MsTranslator({
  api_key: "050edbf73b254412bc37017313c71146"
}, true);

var params = {
  text: 'How\'s it going?',
  to: 'th'
};

// Don't worry about access token, it will be auto-generated if needed.
client.translate(params, function(err, data) {
  console.log(data);
});


var param2 = {
  text: 'How\'s it going?'
};


client.detect(params, function(err, data) {
  console.log(data);
});