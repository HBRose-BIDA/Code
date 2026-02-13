import pyodbc

# Connection string
conn_str = (
    r'DRIVER={Microsoft Access Driver (*.mdb, *.accdb)};'
    r'DBQ=C:\Users\roser\OneDrive\HB\St Marys\Classes\BIA 650 Data Mining for Decision Making\Data\650 Data Mining.accdb;'
)

# Connect to the database
conn = pyodbc.connect(conn_str)

# Create a cursor object
cursor = conn.cursor()

# Execute a query on the 'Revenue YTD' table
cursor.execute('SELECT * FROM [Revenue YTD]')  # Accessing the table
print (conn_str)
# Fetch and print the results
for row in cursor.fetchall():
    print(row)

# Close the cursor and connection
cursor.close()
conn.close()
