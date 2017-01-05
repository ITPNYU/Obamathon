/*
	This script parses the tweets.csv file into a usable tweets.json file.

	CSV LAYOUT IS AS FOLLOWS:

	[0]	tweet_id,
	[1]	in_reply_to_status_id,
	[2] in_reply_to_user_id,
	[3]	timestamp,
	[4]	source,
	[5]	text,
	[6]	retweeted_status_id,
	[7]	retweeted_status_user_id,
	[8]	retweeted_status_timestamp,
	[9]	expanded_urls

 */

var fs = require('fs');
var parse = require('csv-parse');
var async = require('async');

var inputFile='tweets.csv';

// create an object to hold the tweets
var resultsJson = {
	tweets: []
};

// parse the .csv file
var parser = parse({delimiter: ','}, function (err, data) {
  	
	// use async to run through each line sequentially
  	async.eachSeries(data, function (line, callback) {
	    
	    var urls = [];

		// check if the field is empty
		if (line[9].length > 0 && line[9] != "expanded_urls"){

			// check for multiple URLs
			if (line[9].indexOf(',') != -1)
			{
				var temp_urls = line[9].split(',');

				for (var i = 0; i < temp_urls.length; i++)
				{
					urls.push(temp_urls[i]);
				}

			} else {
				urls.push(line[9]);
			}


		}

		// create a tweet object with all relevant data
		var tweet = {
			tweet_id: line[0],
			in_reply_to_status_id: line[1],
			in_reply_to_user_id: line[2],
			timestamp: line[3],
			source: decodeURI(line[4]),
			text: line[5],
			retweeted_status_id: line[6],
			retweeted_status_user_id: line[7],
			retweeted_status_timestamp: line[8],
			expanded_urls: urls
		}

		// push the tweet object into the tweets array
		resultsJson.tweets.push(tweet);

		callback();
 
    }, function(){
    	console.log('Saving Json!');

    	// convert the resultsJson file to a string
    	var json = JSON.stringify(resultsJson, null, 2);

    	// write the file to disk
	   	fs.writeFile('./tweets.json', json, function(err) {
	        if (err) console.log('Err ' + err);
	        console.log('Successfully created tweets.json');
	    }); 

    });
});


fs.createReadStream(inputFile).pipe(parser);
