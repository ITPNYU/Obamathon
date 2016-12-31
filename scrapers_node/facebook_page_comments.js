var fs = require('fs');

var FB = require('fb');
var config = require('./config');
FB.setAccessToken(config.token);

var all = [];

var page = 'barackobama/feed'

FB.api(page, 'get', gotPage);

function gotPage(res) {

  if (!res || res.error) {
    // console.log(!res ? 'error occurred' : res.error);
    // Ooops, this is not the right time to write the file
    // It will work, but how to best track when all posts have completed
    // console.log('Finished scraping, writing file');
    // var everything = all.join('\n');
    // fs.writeFileSync('allcomments.txt', everything);
    return;
  } else {
    var posts = res.data;
    for (var i = 0; i < posts.length; i++) {
      var id = posts[i].id;
      FB.api(id + '/comments', 'get', gotComments);
    }

    function gotComments(res) {
      if (!res || res.error) {
        console.log('nothing left comments');
        return;
      }
      var comments = res.data;
      for (var j = 0; j < comments.length; j++) {
        console.log('logging: ' + comments[j].created_time);
        all.push(comments[j].id + '\t' + comments[j].created_time + '\t' + comments[j].message);
      }
      if (res.paging && res.paging.next) {
        FB.api(id + '/comments/?after=' + res.paging.cursors.after, 'get', gotComments);
        //console.log(res.paging.next);
      }
    };

    var next = res.paging.next.match(/until=\d+/)[0];
    FB.api(page + '/?' + next, 'get', gotPage);
  }
};
