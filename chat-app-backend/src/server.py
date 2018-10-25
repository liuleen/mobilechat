from datetime import datetime
from flask import (
    Flask,
    request,
    abort, 
    jsonify
)

app = Flask(__name__)

#global variable users to store usernames
users = []

@app.route("/")
def hello():
    return "hello\n"

# check if username is taken or nil

@app.route("/login", methods=["POST"])
def login():
    username = request.json.get('username', None)
    user_taken = username in users
    if username is None or user_taken:
        abort(401)
    else:
        users.append(username)
        return jsonify({
        'status': 'ok',
        'message': 'Successfully Logged in',
        })

@app.route("/send", methods=["POST"])
def send():
    username = request.json.get('username', None)
    message = request.json.get('message', None)
    timestamp = datetime.now()
    id = 

if __name__ == '__main__':
    app.run(debug=True)