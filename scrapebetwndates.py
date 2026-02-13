import pandas as pd
import datetime
from random import randint
from time import sleep
import os


# date format date = "2021-10-12"
def scrape_nhl_data_for_date_range(start_season, end_season, stats_url_template, start_date, end_date, output_path):
    try:
        # Convert string dates to datetime objects
        start_date = datetime.datetime.strptime(start_date, "%Y-%m-%d").date()
        end_date = datetime.datetime.strptime(end_date, "%Y-%m-%d").date()
        
        all_data = []

        # Loop over each day in the range
        current_date = start_date
        while current_date <= end_date:
            # Generate the URL for the current date
            stats_url = stats_url_template.format(start_season, end_season, current_date, current_date)

            # Scrape the data
            nhl_dfs = pd.read_html(stats_url, index_col=0)
            nhl_df = nhl_dfs[0]
            nhl_df['Date'] = current_date
            all_data.append(nhl_df)

            # Sleep to mimic human behavior
            sleep(randint(10,25))

            # Move to the next day
            current_date += datetime.timedelta(days=1)

        # Concatenate all dataframes and write to CSV
        final_df = pd.concat(all_data, ignore_index=True)
        final_df.to_csv(output_path, index=False)
        print("Data scraping complete for the specified date range and saved to", output_path)

    except Exception as e:
        print("An error occurred:", e)

# Parameters for a date range
start_season = "20212022"
end_season = "20212022"
start_date = "2024-01-20"  # Start of the date range in 'YYYY-MM-DD' format
end_date = "2024-01-23"    # End of the date range in 'YYYY-MM-DD' format
stats_url_template = 'https://www.naturalstattrick.com/teamtable.php?fromseason={}&thruseason={}&stype=2&sit=ev&score=all&rate=y&team=all&loc=B&gpf=410&fd={}&td={}'
output_path = r"C:\Users\roser\OneDrive\HB\St Marys\Classes\BIA 650 Data Mining for Decision Making\Week 3\DateRangeScrape.csv"

# Execute the function for a date range
scrape_nhl_data_for_date_range(start_season, end_season, stats_url_template, start_date, end_date, output_path)
