// Create an Twitter object to connect to Twitter API
// npm install twit
var Twit = require('twit');
var fs = require('fs');

var twitterName = 'POTUS';

// Pulling all my twitter account info from another file
var config = require('./config.js');
// Making a Twit object for connection to the API
var T = new Twit(config);

var howmany = 200;

// Execute a Twitter API call
T.get('statuses/user_timeline', {
  screen_name: twitterName,
  count: howmany
}, gotData);
var tweets = [];

var count = 0;

function validate(txt) {
  // if (txt.substring(0,2)==='RT') {
  //   return false;
  // }
  //
  // if (txt.charAt(0) === '@') {
  //   return false;
  // }
  return true;
}

// Callback
function gotData(err, data) {

  // It's over if no tweets (or even just 1?)
  if (data.length <= 1) {
    // var s = '';
    // for (var i = 0; i < tweets.length; i++) {
    //   s += tweets[i] + '\n';
    // }
    // fs.writeFileSync('potus_all.txt',s,'utf-8');

    var json = JSON.stringify(tweets,null, 2);
    fs.writeFileSync(twitterName + '.json', json, 'utf-8');
    process.exit();
  }
  //console.log(data);


  console.log('Got ' + data.length + ' tweets.');
  // var s = JSON.stringify(data,null,2);
  // fs.writeFileSync('tweets.json',s);
  // Get the tweets
  for (var i = 0; i < data.length; i++) {
    var tweet = data[i].text;
    // var id = data[i].id;
    // var date = data[i].created_at;
    if (validate(tweet)) {
      // tweets.push(id + '\t' + date + '\t' + tweet);
      // tweets.push(tweet);
      tweets.push(data[i]);
      // console.log(tweet);
    }
  }

  var last = data.length - 1;
  var oldest = data[last].id;
  console.log(data[last].created_at)
  console.log('Total tweets: ' + tweets.length)
  T.get('statuses/user_timeline', {
    screen_name: twitterName,
    count: howmany,
    max_id: oldest
  }, gotData);
};
