from flask import Flask, jsonify, request
from flask_cors import CORS
from encryption import decrypt
app = Flask(__name__)

users = {"user1": {"password": "password1", "projects": []}}
checkout_elements = {"item1": {"available": 5, "capacity": 10}}


@app.route("/")
def index():
    return 'Index Page'

@app.route('/checkout-elements', methods=['GET'])
def get_checkout_elements():
    return jsonify({"elements": checkout_elements}), 200

@app.route('/join-project', methods=['POST'])
def join_project():
    data = request.json
    username = data.get('username')
    project = data.get('project')
    if username not in users:
        return jsonify({"message": "User not found", "status": "fail"}), 404
    if project not in users[username]['projects']:
        users[username]['projects'].append(project)
        return jsonify({"message": "Project joined", "status": "success"}), 200
    return jsonify({"message": "Already a member of the project", "status": "fail"}), 400

users = {
        "asamant": "Temp123",
        "aissa": "TheKing%^&",
        "bjha": "$72messenger",
        "skharel": "Life15$",
        "Ally!": "God$12"
}

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    # Assuming you want to decrypt data received
    decrypted_username = username
    decrypted_password = password
    
    if decrypted_username in users and users[decrypted_username] == decrypted_password:
        return jsonify({"message": "Login successful", "status": "success"}), 200
    return jsonify({"message": "Invalid credentials", "status": "fail"}), 401


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

@app.route('/projects/<int:project_id>/checkout', methods=['POST'])
def checkout_hardware(project_id):
    '''
    if 'user' not in session:
        return jsonify({'message': 'Unauthorized'}), 401
    '''


    qty = request.json.get('qty', 1)  # Default to 1 if not specified
    hardware_set = project_hardware_sets.get(project_id)

    if hardware_set:
        result = hardware_set.check_out(qty)
        if result == 0:
            return jsonify({
                'message': 'Checked out successfully',
                'availability': hardware_set.get_availability()
            }), 200
        else:
            return jsonify({'message': 'Not enough availability'}), 400
    else:
        return jsonify({'message': 'Project not found'}), 404

@app.route('/projects/<int:project_id>/checkin', methods=['POST'])
def checkin_hardware(project_id):
    # ... similar logic as checkout_hardware
    qty = request.json.get('qty', 1)
    hardware_set = project_hardware_sets.get(project_id)

    if hardware_set:
        result = hardware_set.check_in(qty)
        if result == 0:
            return jsonify({
                'message': 'Checked in successfully',
                'availability': hardware_set.get_availability()
            }), 200
        else:
            return jsonify({'message': 'Exceeds capacity'}), 400
    else:
        return jsonify({'message': 'Project not found'}), 404

@app.route('/projects', methods=['GET'])
def get_projects():
    project_list = []
    for project_id, hardware_set in project_hardware_sets.items():
        project_list.append({
            'id': project_id,
            'available': hardware_set.get_availability(),
            'capacity': hardware_set.get_capacity()
        })
    return jsonify(project_list)



if __name__ == "__main__":
    app.run(debug=True)


