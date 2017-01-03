var fs = require('fs');

var FB = require('fb');
var config = require('./config');
FB.setAccessToken(config.token);

var name = 'barackobama';
var page = name + '/feed';

var allposts = [];

FB.api(page, 'get', gotPage);

function gotPage(res) {

  if (!res || res.error) {
    console.log(!res ? 'error occurred' : res.error);
    return;
  } else {
    var posts = res.data;
    var json = JSON.stringify(res, null, 2);
    fs.writeFileSync('res.json', json);
    
    console.log('got ' + posts.length + ' post');
    console.log('1 Created_time: ' + posts[0].created_time);
    console.log('2 Created_time: ' + posts[posts.length-1].created_time);
    console.log('-------------------');
    for (var i = 0; i < posts.length; i++) {
      var id = posts[i].id;
      allposts.push(posts[i]);
    }

    // url for next page
    var previous = res.paging.previous.match(/since=\d+/)[0];
    var next = res.paging.next.match(/until=\d+/)[0];
    // What's the page id
    var prev = previous.substring(6, previous.length);
    var nxt = next.substring(6, next.length);
    console.log(prev,nxt);
    if (prev == nxt) {
      // we're done
      var json = JSON.stringify(allposts, null, 2);
      fs.writeFileSync(name + '.json', json);
      console.log('finished: ' + name + '.json');
    } else {
      // Keep going
      FB.api(page + '/?' + next, 'get', gotPage);
    }
  }
};
