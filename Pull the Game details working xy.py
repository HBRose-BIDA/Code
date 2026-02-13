import requests
from openpyxl import Workbook

# Set the URL for the gamepack details
url = 'https://statsapi.web.nhl.com/api/v1/game/2022010058/feed/live'

# Send a GET request to the URL and store the response in a variable
response = requests.get(url)

# Parse the response JSON data
data = response.json()

# Create a new Excel workbook
workbook = Workbook()

# Select the active worksheet
worksheet = workbook.active

# Write the headers for the worksheet
worksheet['A1'] = 'X Coordinate'
worksheet['B1'] = 'Y Coordinate'

# Iterate through the game events and write each x and y coordinate to the worksheet
for event in data['liveData']['plays']['allPlays']:
    if 'coordinates' in event:
        coords = event['coordinates']
        if 'x' in coords and 'y' in coords:
            x_coord = coords['x']
            y_coord = coords['y']
            worksheet.append([x_coord, y_coord])

# Save the workbook to a file
workbook.save(r'C:\Users\roser\OneDrive\HB\St Marys\Classes\BIA 665 Decision Support Systems\Week5\DD\Data\gamepack_2022010058.xlsx')
