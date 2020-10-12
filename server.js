const APP_SECRET = 'yo61563bc701140312116ee66ae7c56ea3u';
const VALIDATION_TOKEN = 'TokenTuyChon';
const PAGE_ACCESS_TOKEN = 'EAAN622V8N4oBAAHZAo1fX9TZAoTDzv78ZBWldEx3aWPrRvbWHec2B7elvuFH0R0ZADcWcJhjLSpQ1RQ70fKWFk2AjNzrKS61MQRZCnA9OVWrSQnFNdh64eI0w2ZAB40iEw4dTXtzEvWJwa3amMOKnJA02V6Q0897VWV0lmswthBZB4ZAZANNFIZAecRYNAh7JvwXUZD';

var http = require('http');
var https = require('https');
var bodyParser = require('body-parser');
var express = require('express');

var app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
var server = http.createServer(app);
var httpsServer = https.createServer(app);
var request = require("request");
app.get('/', (req, res) => {
  res.send("Home page. Server running okay.");
});

app.get('/webhook', function(req, res) { // Đây là path để validate tooken bên app facebook gửi qua
  if (req.query['hub.verify_token'] === VALIDATION_TOKEN) {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
});

app.post('/webhook', function(req, res) { // Phần sử lý tin nhắn của người dùng gửi đến
  var entries = req.body.entry;
  for (var entry of entries) {
    var messaging = entry.messaging;
    for (var message of messaging) {
      var senderId = message.sender.id;
      if (message.message) {
        if (message.message.text) {
          var text = message.message.text;
          sendMessage(senderId, "Hello!! I'm a bot. Your message: " + text);
        }
      }
    }
  }
  res.status(200).send("OK");
});

// Đây là function dùng api của facebook để gửi tin nhắn
function sendMessage(senderId, message) {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {
      access_token: EAAN622V8N4oBAAHZAo1fX9TZAoTDzv78ZBWldEx3aWPrRvbWHec2B7elvuFH0R0ZADcWcJhjLSpQ1RQ70fKWFk2AjNzrKS61MQRZCnA9OVWrSQnFNdh64eI0w2ZAB40iEw4dTXtzEvWJwa3amMOKnJA02V6Q0897VWV0lmswthBZB4ZAZANNFIZAecRYNAh7JvwXUZD,
    },
    method: 'POST',
    json: {
      recipient: {
        id: senderId
      },
      message: {
        text: message
      },
    }
  });
}

app.set('port', process.env.PORT || 6996);
app.set('ip', process.env.IP || "0.0.0.0");

httpServer.listen(app.get('port'), function() {
  console.log("Chat bot server listening at %s:%d ", app.get('ip'), app.get('port'));
});