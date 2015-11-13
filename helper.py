import os
import json

def path_to_dict(path):
    fname = os.path.basename(path)
    d = {'src': 'assets/' + fname, 'id': fname.split('.')[0]}
    if os.path.isdir(path):
        d = [path_to_dict(os.path.join(path,x)) for x in os.listdir\
(path)]

    return d

with open('manifest.json', 'w+') as manifest:
    manifest.write(json.dumps(path_to_dict('assets/')));
