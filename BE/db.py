from pymongo.mongo_client import MongoClient
import os

pw = os.environ.get('MONGO_PW')
#pw = "UTECE"
uri = f"mongodb+srv://Sam:{pw}@cluster0.ynnzx4e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
# Create a new client and connect to the server
client = MongoClient(uri)

# Select your database
db = client["projectDB"]


userDB = db["users"]

def user_exist(userID):
    myquery={"userID":userID}
    user = userDB.find_one(myquery)
    if user == None:
        return False
    return True


def user_new(userID,encrypted_password):
    if not user_exist(userID):
        newUser = {
            "userID" :userID,
            "userPW" : encrypted_password
        }
        userDB.insert_one(newUser)
    else:
        return "user exists" # will probably need to change this to an actual error code system

def user_delete(userID):
    if user_exist(userID):
        myquery={"userID":userID}
        user = userDB.find_one(myquery)
        userDB.remove_one(user)
    else:
        return "cant find user"
    
def user_check_password(userID,encrypted_password):
    if not user_exist(userID):
        return False
    myquery={"userID":userID}
    user = userDB.find_one(myquery)
    if user["userPW"] == encrypted_password:
        return True
    else:
        return False

# check if user is already in project
# true if user is already in project
def user_already_in_project(userID, projectID):
    myquery = {"$and": [{"projectID": projectID}, {"users": userID}]}
    project = projectDB.find_one(myquery)
    return project is not None


def user_add_project(userID, projectID):
    myquery = {"userID": userID}
    newvalues = {"$push": {"projects": projectID}}
    userDB.update_one(myquery, newvalues)  # Fixed the code by adding the missing member name 'DB' after 'user'

def user_remove_project(userID, projectID):
    myquery = {"userID": userID}
    newvalues = {"$pull": {"projects": projectID}}
    userDB.update_one(myquery, newvalues)

projectDB = db["projects"]

def get_all_projects():
    return list(projectDB.find())

def get_project(projectID):
    myquery={"projectID":projectID}
    return projectDB.find_one(myquery)

def project_exist(projectID):
    project = get_project(projectID)
    if project == None:
        return False
    return True

def project_new(hardwareSets,users): #project ID's should be created automatically
    newProject = {
            #"projectID" :projectID,
            "hardwareSets" : hardwareSets,
            "users" : users
        }
    result = projectDB.insert_one(newProject)
    return result.inserted_id
  
def project_delete(projectID):
    if project_exist(projectID):
        project = get_project(projectID)
        projectDB.remove_one(project)
    else:
        return "cant find project"



def project_modify(projectID,hardwareSets,users):
    if project_exist(projectID):
        project = get_project(projectID)
        if hardwareSets != None:
            project["hardwareSets"] = hardwareSets
            project["users"] = users
        myquery={"projectID":projectID}
        projectDB.update_one(myquery,project)
    else:
        return "Project Doesn't Exist"
    

def project_add_member(projectID, username):
    myquery = {"projectID": projectID}
    newvalues = {"$push": {"users": username}}
    projectDB.update_one(myquery, newvalues)

def project_remove_member(projectID, username):
    myquery = {"projectID": projectID}
    newvalues = {"$pull": {"users": username}}
    projectDB.update_one(myquery, newvalues)

hwSetDB = db["hardware_sets"]

def hwSet_exist(hwSetID):
    myquery={"hwSetID":hwSetID}
    hwSet = hwSetDB.find_one(myquery)
    if hwSet == None:
        return False
    return True

def hwSet_new(hwSetID,available,capacity):
    if not hwSet_exist(hwSetID):
        newHwSet = {
            "hwSetID" :hwSetID,
            "available" : available,
            "capacity" : capacity
        }
        hwSetDB.insert_one(newHwSet)
    else:
        return "hwSet exists" # will probably need to change this to an actual error code system
    
def hwSet_delete(hwSetID):
    if hwSet_exist(hwSetID):
        myquery={"hwSetID":hwSetID}
        hwSet = hwSetDB.find_one(myquery)
        hwSetDB.remove_one(hwSet)
    else:
        return "cant find hwSet"
    
def hwSet_get(hwSetID):
    myquery={"hwSetID":hwSetID}
    hwSet = hwSetDB.find_one(myquery)
    return hwSet

def hwSet_checkout(hw_set_id, qty):
    myquery = {"hwSetID": hw_set_id}
    hwSet = hwSetDB.find_one(myquery)
    newvalues = {"$set": {"available": hwSet['available'] - qty}}
    hwSetDB.update_one(myquery, newvalues)

def hwSet_checkin(hw_set_id, qty):
    myquery = {"hwSetID": hw_set_id}
    hwSet = hwSetDB.find_one(myquery)
    newvalues = {"$set": {"available": hwSet['available'] + qty}}
    hwSetDB.update_one(myquery, newvalues)