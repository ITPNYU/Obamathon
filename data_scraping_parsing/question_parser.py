import os
import re
import string
import json


# finds all the questions in speeches
regex = re.compile("[\.|\?]\s([A-Z].*\?)")
# directory with all of the speeches
path = './speeches/'
# output filename
final = 'obama_speech_qustions.json'

questions = []

for filename in os.listdir(path):
    with open(os.path.join('./speeches', filename)) as f:
        for line in f:
            result = regex.findall(line)
            if result:
                for r in result:
                    cleaned = ''.join(i for i in r if i in string.printable)
                    question = {'filename': filename, 'question': cleaned}
                    questions.append(question)


with open(final, 'w') as outfile:
    json.dump(questions, outfile)

print('created {}'.format(final))
print('found {} questions in {} files').format(len(questions), len(os.listdir(path)))
