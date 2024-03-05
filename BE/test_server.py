import json
import unittest
from server import app

class JoinProjectTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_join_project_user_not_found(self):
        # Test joining a project with user not found
        data = {
            "userID": "nonexistent_user",
            "project": 2
        }
        response = self.app.post('/join-project', data=json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json['message'], "User not found")
        self.assertEqual(response.json['status'], "fail")

    def test_join_project_project_not_found(self):
        # Test joining a project with project not found
        data = {
            "userID": "skharel",
            "project": "nonexistent_project"
        }
        response = self.app.post('/join-project', data=json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json['message'], "Project does not exist")
        self.assertEqual(response.json['status'], "fail")

    def test_join_project_already_member(self):
        # Test joining a project when already a member
        data = {
            "userID": "asamant",
            "project": 1
        }
        response = self.app.post('/join-project', data=json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json['message'], "Already a member of the project")
        self.assertEqual(response.json['status'], "fail")

    def test_join_project_success(self):
        # Test joining a project successfully
        data = {
            "userID": "asamant",
            "project": 2
        }
        response = self.app.post('/join-project', data=json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['message'], "Project joined")
        self.assertEqual(response.json['status'], "success")




if __name__ == '__main__':
    unittest.main()