import json
import urllib.request

# specify the URL that contains the JSON data
url = "https://statsapi.web.nhl.com/api/v1/schedule?startDate=2022-10-01&endDate=2023-04-09"

# read the JSON data from the URL and decode it into a string
with urllib.request.urlopen(url) as url:
    json_data = url.read().decode()

# parse the JSON data into a dictionary
data_dict = json.loads(json_data)

# print the dictionary
print(data_dict)
