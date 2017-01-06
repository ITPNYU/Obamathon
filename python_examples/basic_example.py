import json

# load the JSON file
with open('../data/facebook_barackobama.json') as data_file:    
    data = json.load(data_file)

# print out the message
print data[0]["message"]
# print how many people shared this message
print "Shares: " + str(data[0]["shares"]["count"])
# print out the first comment
print "Comment: " + data[0]["comments"]["data"][0]["message"]
# print how many people liked that comment
print "Likes: " + str(data[0]["comments"]["data"][0]["like_count"])