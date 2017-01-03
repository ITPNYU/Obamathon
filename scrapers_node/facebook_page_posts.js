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
    // console.log('Finished scraping, writing file');
    // var everything = all.join('\n');
    var json = JSON.stringify(allposts, null, 2);
    fs.writeFileSync(name + '.json', json);
    return;
  } else {
    var posts = res.data;
    //var json = JSON.stringify(posts, null, 2);
    //fs.writeFileSync('posts.json', json);
    console.log('got ' + posts.length + ' post');
    console.log('1 Created_time: ' + posts[0].created_time);
    console.log('2 Created_time: ' + posts[posts.length-1].created_time);
    console.log('-------------------');
    for (var i = 0; i < posts.length; i++) {
      var id = posts[i].id;
      allposts.push(posts[i]);
    }
    var next = res.paging.next.match(/until=\d+/)[0];
    FB.api(page + '/?' + next, 'get', gotPage);
  }
};
