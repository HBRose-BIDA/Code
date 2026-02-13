import openpyxl
import requests

# Make request to NHL API and get response
url = "https://statsapi.web.nhl.com/api/v1/game/2022010058/feed/live"
response = requests.get(url)

# Parse response JSON and get all events
json_data = response.json()
all_events = json_data["liveData"]["plays"]["allPlays"]

# Create new spreadsheet and set up header row
workbook = openpyxl.Workbook()
worksheet = workbook.active
worksheet.append(["Event ID", "Event Type", "Period", "Time", "Description","X", "Y", "Player ID"])

# Write event data to spreadsheet
for event in all_events:
    event_id = event["about"]["eventIdx"]
    event_type = event["result"]["eventTypeId"]
    period = event["about"]["period"]
    time = event["about"]["periodTime"]
    description = event["result"]["description"]
    
    if 'coordinates' in event:
        coords = event['coordinates']
        if 'x' in coords and 'y' in coords:
            x_coord = coords['x']
            y_coord = coords['y']
        else:
            x_coord = ''
            y_coord = ''
    else:
        x_coord = ''
        y_coord = ''
    
    # Get player ID if it exists
    player_id = ''
    if 'players' in event:
        for player in event['players']:
            if 'player' in player:
                player_id = player['player']['id']
                break
    
    worksheet.append([event_id, event_type, period, time, description, x_coord, y_coord, player_id])

# Save spreadsheet to disk
workbook.save(r"C:\Users\roser\OneDrive\HB\St Marys\Classes\BIA 665 Decision Support Systems\Week5\DD\Data\NHL game events.xlsx")
