import requests
import json

# API endpoint URL
url = 'https://statsapi.web.nhl.com/api/v1/teams'

# Make GET request to API endpoint
response = requests.get(url)

# Extract JSON content from response
content = response.json()

# Specify file path for JSON file
file_path = r'C:\Users\roser\OneDrive\HB\St Marys\Classes\BIA 665 Decision Support Systems\Week5\Data\nhl_teams.json'

# Write JSON content to file
with open(file_path, 'w') as file:
    json.dump(content, file)
