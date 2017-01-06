var potus;
var counts = {};

var ignore = {
  "the": 'true',
  "to": 'true',
  "we": 'true',
  "of": 'true',
  "and": 'true',
  "a": 'true',
  "http": 'true',
  "https": 'true',
  "our": 'true'
}

function preload() {
  potus = loadJSON('flotus.json');

}

function setup() {
  createCanvas(600, 400);
  var tweets = potus.tweets;
  for (var i = 0; i < tweets.length; i++) {
    var date = new Date(tweets[i].timestamp);
    var month = date.getMonth();
    var year = date.getFullYear();
    var key = month + '/' + year;
    if (counts.hasOwnProperty(key)) {
      counts[key].total++;
    } else {
      counts[key] = {
        total: 1,
        words: {}
      };
    }
    var txt = tweets[i].text;
    var words = txt.split(/\W+/);

    for (var j = 0; j < words.length; j++) {
      var word = words[j].toLowerCase();
      if (word.length > 0) {
        if (counts[key].words.hasOwnProperty(word)) {
          counts[key].words[word]++;
        } else {
          counts[key].words[word] = 1;
        }
      }
    }

  }
  background(0);

  console.log(counts);
  var months = Object.keys(counts);
  months.reverse();

  var maxtweets = 0;
  for (var i = 0; i < months.length; i++) {
    var month = months[i];
    var num = counts[month].total;
    if (num > maxtweets) {
      maxtweets = num;
    }
  }
  var w = width / months.length;

  for (var i = 0; i < months.length; i++) {
    var month = months[i];
    var num = counts[month].total;
    var h = map(num, 0, maxtweets, 0, 300);
    fill(200);
    rect(i * w, height - h, w - 1, h);

    var wordCounts = counts[month].words;
    var words = Object.keys(wordCounts);
    var biggest = 0;
    var biggestWord = '';
    for (var j = 0; j < words.length; j++) {
      var word = words[j];
      if (wordCounts[word] > biggest && !ignore[word] && word.length > 3) {
        biggest = wordCounts[word];
        biggestWord = word;
      }
    }
    console.log(month, biggestWord, biggest);
    fill(255);
    text(biggestWord, i * w, height - h - 5);

  }

  console.log(months);

}
