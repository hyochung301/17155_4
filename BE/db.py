import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["projectDB"] #change this to actual db name
userDB = mydb["users"]

def does_user_exist(userID):
    myquery={"userID":userID}
    user = userDB.find_one(myquery)
    if user == None:
        return False
    return True


def add_user(userID,encrypted_password):
    if not does_user_exist(userID):
        newUser = {
            "userID" :userID,
            "password" : encrypted_password
        }
        userDB.insert_one(newUser)
    else:
        return "user exists" # will probably need to change this to an actual error code system

def remove_user(userID):
    if does_user_exist(userID):
        myquery={"userID":userID}
        user = userDB.find_one(myquery)
        userDB.remove_one(user)
    else:
        return "cant find user"
