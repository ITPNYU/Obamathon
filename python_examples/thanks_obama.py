import json
import urllib2

# load the JSON file
with open('../data/facebook_barackobama.json') as data_file:    
    data = json.load(data_file)

# print original message
print data[0]["message"]
# print a blank line
print

comments = data[0]["comments"]

while len(comments["data"]) > 0:
	# print any comments with the phrase "Thanks Obama"
	for comment in comments["data"]:
		if "Thanks Obama" in comment["message"]:
			print comment["message"]

	# get the next page of comments
	request_url = comments["paging"]["next"]
	# get the url before the parameters so we can replace the access token
	request_url = request_url.split('?', 1)[0]
	parameters = '?access_token=731310856938739|9352ea3d06cee639a7723806c4f78b9f&limit=25&after=' + comments["paging"]["cursors"]["after"]

	# load json from url
	try:
		response = urllib2.urlopen(request_url + parameters)
		data = json.load(response) 
		# start over
		comments = data
	except urllib2.HTTPError, e:
	    print "No more comments"
	    break

	