import requests

# URL to get all NHL teams
url = "https://api-web.nhle.com/v1/teams"

# Send a GET request to the NHL API
response = requests.get(url)

# Check if the request was successful
if response.status_code == 200:
    # Parse the JSON response
    data = response.json()
    
    # Extract and print team names
    teams = data['teams']
    for team in teams:
        print(team['name'])
else:
    print("fai")