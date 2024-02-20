from flask import Flask

app = Flask(__name__)

with open('testsite.html', 'r') as f:
    html_string = f.read()

@app.route("/")
def hello_world():
    return html_string
