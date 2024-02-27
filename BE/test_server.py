import json
import unittest
from server import app

class LoginTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_valid_credentials(self):
        # Test with valid credentials
        data = {
            "username": "skharel",
            "password": "Life15$"
        }
        response = self.app.post('/login', data=json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['message'], "Login successful")
        self.assertEqual(response.json['status'], "success")

    def test_invalid_credentials(self):
        # Test with invalid credentials
        data = {
            "username": "encrypted_username",
            "password": "wrong_password"
        }
        response = self.app.post('/login', data=json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.json['message'], "Invalid credentials")
        self.assertEqual(response.json['status'], "fail")

if __name__ == '__main__':
    unittest.main()