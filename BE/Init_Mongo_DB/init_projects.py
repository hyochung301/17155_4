from pymongo.mongo_client import MongoClient

uri = "mongodb+srv://Sam:UTECE@cluster0.ynnzx4e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
# Create a new client and connect to the server
client = MongoClient(uri)

# Select your database
db = client["projectDB"]

# dummy data for projects
projects = {
    1: {
        'hardwareSets': [1, 2],
        'users': ['asamant', 'aissa']
    },
    2: {
        'hardwareSets': [2],
        'users': ['bjha', 'skharel']
    }
}

# Select your collection
projectsCollection = db["projects"]

# Insert each project into the collection
for projectID, projectData in projects.items():
    project = {"projectID": projectID, "hardwareSets": projectData['hardwareSets'], "users": projectData['users']}
    projectsCollection.insert_one(project)