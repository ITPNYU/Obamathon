import json
import urllib2

# IMPORTANT!!!
# create a txt file called mykeys.txt
# the first line is your facebook app id, the second line your app secret 
with open("mykeys.txt") as f:
    mykeys = f.readlines()
    app_id = mykeys[0].rstrip()
    app_secret = mykeys[1].rstrip()

# load the JSON file
with open('../data/facebook_barackobama.json') as data_file:    
    data = json.load(data_file)

# print original message
counter = 0
print data[counter]["message"]
# print a blank line
print

comments = data[0]["comments"]

while len(comments["data"]) > 0:
	# print any comments with the phrase "Thanks Obama"
	for comment in comments["data"]:
		if "Thanks Obama" in comment["message"]:
			print comment["message"]

	# get the next page of comments
	if "next" in comments["paging"]:
		request_url = comments["paging"]["next"]
		# get the url before the parameters so we can replace the access token
		request_url = request_url.split('?', 1)[0]
		parameters = '?access_token={0}|{1}&limit=999&after={2}'.format(app_id, app_secret, comments["paging"]["cursors"]["after"])

		# load json from url
		try:
			response = urllib2.urlopen(request_url + parameters)
			new_data = json.load(response) 
			# start over
			comments = new_data
		except urllib2.HTTPError, e:
		    counter += 1
		    comments = data[counter]["comments"]
	else:
		break

	