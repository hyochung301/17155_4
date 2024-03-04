from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
# from encryption import decrypt
import db
app = Flask(__name__, static_folder="../FE/build", static_url_path="/")

CORS(app)


@app.route("/", methods=["GET"])
def index():
    return send_from_directory(app.static_folder, "index.html")
    

# ********************************** User Management Endpoints **********************************


@app.route('/login', methods=['POST'])
def login():
        """
        Endpoint for user login.

        Parameters:
        - userID (str): The username of the user.
        - password (str): The password of the user.

        Returns:
        - JSON response: A JSON response indicating the status of the login attempt.
            -  login successful: status code 200, {"message": "Login successful", "status": "success"}
            -  invalid credentials: status code 401, {"message": "Invalid credentials", "status": "fail"}
        """
        data = request.json
        userID = data.get('userID')
        password = data.get('password')
        
        # Assuming you want to decrypt data received
        decrypted_username = userID
        decrypted_password = password
        
        if db.user_exist(decrypted_username) and users[decrypted_username] == decrypted_password:
                return jsonify({"message": "Login successful", "status": "success"}), 200
        return jsonify({"message": "Invalid credentials", "status": "fail"}), 401

# user registration endpoint
@app.route('/register', methods=['POST'])
def register():
    """
    Endpoint for user registration.

    Parameters:
    - userID (str): The username of the user.
    - password (str): The password of the user.

    Returns:
    - JSON response: A JSON response indicating the status of the registration attempt.
        -  registration successful: status code 200, {"message": "Registration successful", "status": "success"}
        -  user already exists: status code 400, {"message": "User already exists", "status": "fail"}
    """
    data = request.json
    userID = data.get('userID')
    password = data.get('password')
    
    # Assuming you want to decrypt data received
    decrypted_username = userID
    decrypted_password = password
    
    if db.user_exist(decrypted_username):
        return jsonify({"message": "User already exists", "status": "fail"}), 400
    db.user_new(decrypted_username, decrypted_password)
    return jsonify({"message": "Registration successful", "status": "success"}), 200

# user deletion endpoint
@app.route('/delete-user', methods=['POST'])
def delete_user():
    """
    Endpoint for deleting a user.

    Parameters:
    - userID (str): The username of the user.

    Returns:
    - JSON response: A JSON response indicating the status of the deletion attempt.
        -  user deleted: status code 200, {"message": "User deleted", "status": "success"}
        -  user not found: status code 404, {"message": "User not found", "status": "fail"}
    """
    data = request.json
    userID = data.get('userID')
    if db.user_exist(userID):
        db.user_delete(userID)
        return jsonify({"message": "User deleted", "status": "success"}), 200
    return jsonify({"message": "User not found", "status": "fail"}), 404



# ********************************** Project Management Endpoints **********************************

@app.route('/projects', methods=['GET'])
def get_projects():
    """
    Retrieves a list of projects with their availability and capacity.

    Returns:
        A JSON response containing a list of projects with their respective ID, availability, and capacity.
    """
    project_list = []
    for project in db.get_all_projects():
        for hwSetID in project['hardwareSets']:
            hwSet = db.hwSet_get(hwSetID)
            project_list.append({
                'id': project['projectID'],
                'available': hwSet['available'],
                'capacity': hwSet['capacity']
            })
    return jsonify(project_list)


users = {"user1": {"password": "password1", "projects": []}}

@app.route('/join-project', methods=['POST'])
def join_project():
    """
    Endpoint for joining a project.

    Parameters:
    - userID (str): The username of the user joining the project.
    - project (str): The name of the project to join.

    Returns:
    - JSON response with a message and status code:
        - If the user is not found, returns {"message": "User not found", "status": "fail"} with status code 404.
        - If the project is not found, returns {"message": "Project does not exist", "status": "fail"} with status code 404.
        - If the user is already a member of the project, returns {"message": "Already a member of the project", "status": "fail"} with status code 400.
        - If the user successfully joins the project, returns {"message": "Project joined", "status": "success"} with status code 200.
    """
    data = request.json
    userID = data.get('userID')
    project = data.get('project')
    #check if user exists
    if db.user_exist(userID) == False:
        return jsonify({"message": "User not found", "status": "fail"}), 404
    #check if project exists
    if not db.project_exist(project):
        return jsonify({'message': 'Project does not exist', "status": "fail"}), 404
    #check if user is already a member of the project
    if db.user_already_in_project(userID, project):
        return jsonify({"message": "Already a member of the project", "status": "fail"}), 400
    db.user_add_project(project, userID)
    db.project_add_member(project, userID)
    return jsonify({"message": "Project joined", "status": "success"}), 200

@app.route('/leave-project', methods=['POST'])
def leave_project():
    """
    Endpoint for leaving a project.

    Parameters:
    - userID (str): The username of the user leaving the project.
    - project (str): The name of the project to leave.

    Returns:
    - JSON response with a message and status code:
        - If the user is not found, returns {"message": "User not found", "status": "fail"} with status code 404.
        - If the user is not a member of the project, returns {"message": "Not a member of the project", "status": "fail"} with status code 400.
        - If the user successfully leaves the project, returns {"message": "Project left", "status": "success"} with status code 200.
    """
    data = request.json
    userID = data.get('userID')
    project = data.get('project')
    if db.user_exist(userID) == False:
        return jsonify({"message": "User not found", "status": "fail"}), 404
    #check if project exists
    if not db.project_exist(project):
        return jsonify({'message': 'Project does not exist', "status": "fail"}), 404
    if not db.user_already_in_project(userID, project):
        return jsonify({"message": "Not a member of the project", "status": "fail"}), 400
    db.user_remove_project(project, userID)
    db.project_remove_member(project, userID)
    return jsonify({"message": "Project left", "status": "success"}), 200


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

# ********************************** Hardware Management Endpoints **********************************

@app.route('/projects/checkout', methods=['POST'])
def checkout_hardware():
    '''
    Checkout hardware for a specific project.

    Args:
        project_id (int): The ID of the project.
        hw_set_id (int): The ID of the hardware set to check out.
        qty (int): The quantity of hardware to check out.

    Returns:
        JSON response containing the result of the checkout operation.
        Success: status code 200, {"message": "Checked out successfully", "availability": <new availability>}
        Exceeds availability: status code 400, {"message": "Exceeds availability"}
    '''
    data = request.json
    projject_id = data.get('project_id')
    hw_set_id = data.get('hw_set_id')
    qty = data.get('qty')
    hardware_set = db.hwSet_get(hw_set_id)
    availability = hardware_set['available']
    if qty <= 0:
        return jsonify({'message': 'Invalid quantity'}), 400
    if availability < qty:
        return jsonify({'message': 'Exceeds availability'}), 400
    db.hwSet_checkout(hw_set_id, qty)
    return jsonify({'message': 'Checked out successfully', 'availability': availability - qty}), 200
    


@app.route('/projects/checkin', methods=['POST'])
def checkin_hardware():

    '''
    Checkin hardware for a specific hw set.

    Args:
        project_id (int): The ID of the project.
        hw_set_id (int): The ID of the hardware set to check out.
        qty (int): The quantity of hardware to check out.

    Returns:
        JSON response containing the result of the checkin operation.
        Success: status code 200, {"message": "Checked in successfully", "availability": <new availability>}
        Exceeds capacity: status code 400, {"message": "Exceeds capacity"}
    '''
    data = request.json
    projject_id = data.get('project_id')
    hw_set_id = data.get('hw_set_id')
    qty = data.get('qty')
    hardware_set = db.hwSet_get(hw_set_id)
    availability = hardware_set['available']
    capacity = hardware_set['capacity']
    if qty <= 0:
        return jsonify({'message': 'Invalid quantity'}), 400
    if capacity < qty + availability:
        return jsonify({'message': 'Exceeds capacity'}), 400
    # returning more than what was checked out
    # if qty > availability:
    #     return jsonify({'message': 'Exceeds availability'}), 400
    db.hwSet_checkin(hw_set_id, qty)
    return jsonify({'message': 'Checked in successfully', 'availability': availability + qty}), 200



if __name__ == "__main__":
    app.run(debug=True)


