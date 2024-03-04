from pymongo.mongo_client import MongoClient

uri = "mongodb+srv://Sam:UTECE@cluster0.ynnzx4e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
# Create a new client and connect to the server
client = MongoClient(uri)

# Select your database
db = client["projectDB"]

# Select your collection
collection = db["users"]

# Define your data
users = {
    "asamant": "Temp123",
    "aissa": "TheKing%^&",
    "bjha": "$72messenger",
    "skharel": "Life15$",
    "Ally!": "God$12"
}

# Insert each user into the collection
for username, password in users.items():
    user = {"userID": username, "userPW": password, "projects": []}
    collection.insert_one(user)