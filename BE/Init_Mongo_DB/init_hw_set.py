from pymongo.mongo_client import MongoClient

uri = "mongodb+srv://Sam:UTECE@cluster0.ynnzx4e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
# Create a new client and connect to the server
client = MongoClient(uri)

# Select your database
db = client["projectDB"]


# dummy data for hardware sets
project_hardware_sets = {
    1: {
        'available': 5,
        'capacity': 10
    },
    2: {
        'available': 10,
        'capacity': 20
    }
}


# Select your collection
hardwareSetsCollection = db["hardware_sets"]

# Insert each hardware set into the collection
for hardwareSetID, hardwareSetData in project_hardware_sets.items():
    hardwareSet = {"hardwareSetID": hardwareSetID, "available": hardwareSetData['available'], "capacity": hardwareSetData['capacity']}
    hardwareSetsCollection.insert_one(hardwareSet)