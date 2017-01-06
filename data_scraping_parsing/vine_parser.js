/*
	This quick and dirty script checks the assets/Vine folder for images and videos and
  creates a standalone json file containing the filenames
 */

var fs = require('fs');

var resultsJson = {
	// images: [],
	// videos: []
}

const imageFolder = './VINE-WH-archive_1421922769494487040/images/';
const videosFolder = './VINE-WH-archive_1421922769494487040/videos/';

var images = fs.readdirSync(imageFolder);
var videos = fs.readdirSync(videosFolder);

resultsJson.images = images;
resultsJson.videos = videos;

// convert the resultsJson file to a string
var json = JSON.stringify(resultsJson, null, 2);

console.log("writing json file");

// write the file to disk
fs.writeFile('./vine_data.json', json, function(err) {
    if (err) console.log('Err ' + err);
    console.log('Successfully created vine_data.json');
}); 
